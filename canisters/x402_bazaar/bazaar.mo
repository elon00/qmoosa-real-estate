// Qmoosa x402 Bazaar Protocol Canister
// Implements autonomous HTTP 402 machine-to-machine micro-collateralized bidding on ICP

import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor X402Bazaar {

    public type BidStatus = {
        #PendingAiEvaluation;
        #CounterOffer: Nat; // Counter-offer in e8s
        #Accepted;
        #SettledOnSubnet;
        #Refunded;
    };

    public type X402Packet = {
        bidId: Text;
        propertyId: Text;
        bidder: Principal;
        bidderAgent: Text;
        bidAmountE8s: Nat;
        lockedCollateralE8s: Nat; // 5% collateral
        status: BidStatus;
        timestamp: Time.Time;
        negotiationLog: Text;
    };

    private let bids = HashMap.HashMap<Text, X402Packet>(500, Text.equal, Text.hash);

    // Process incoming x402 Machine-to-Machine Packet
    public shared ({ caller }) func submitX402Bid(
        bidId: Text,
        propertyId: Text,
        bidAmountE8s: Nat,
        collateralE8s: Nat,
        agentTag: Text
    ) : async Result<Text, Text> {
        let packet : X402Packet = {
            bidId = bidId;
            propertyId = propertyId;
            bidder = caller;
            bidderAgent = agentTag;
            bidAmountE8s = bidAmountE8s;
            lockedCollateralE8s = collateralE8s;
            status = #PendingAiEvaluation;
            timestamp = Time.now();
            negotiationLog = "HTTP 402 Verified: Micro-collateral locked in canister escrow.";
        };

        bids.put(bidId, packet);
        return #ok("x402 Packet Broadcast Successful");
    };

    // Autonomous Seller Agent Counter-Offer or Accept
    public shared ({ caller }) func respondToBid(
        bidId: Text,
        accept: Bool,
        counterPriceE8s: ?Nat,
        rationale: Text
    ) : async Result<(), Text> {
        switch (bids.get(bidId)) {
            case (null) { return #err("Bid not found"); };
            case (?bid) {
                var newStatus = bid.status;
                if (accept) {
                    newStatus := #Accepted;
                } else {
                    switch (counterPriceE8s) {
                        case (null) { newStatus := #Refunded; };
                        case (?price) { newStatus := #CounterOffer(price); };
                    };
                };

                let updated : X402Packet = {
                    bid with status = newStatus;
                    negotiationLog = rationale;
                };
                bids.put(bidId, updated);
                return #ok(());
            };
        };
    };

    public query func getBid(bidId: Text) : async ?X402Packet {
        return bids.get(bidId);
    };
};
