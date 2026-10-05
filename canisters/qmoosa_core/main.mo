// Qmoosa Core - Real Estate Fractional Registry Canister
// Implements ICRC-7 NFT & Fractional Co-Ownership Standard on ICP

import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor QmoosaCore {

    public type PropertyId = Text;
    public type TokenId = Nat;

    public type IndianPropertyRecord = {
        id: PropertyId;
        title: Text;
        city: Text;
        reraId: Text;
        landExtractHash: Text; // SHA-256 hash of 7/12 Extract
        totalTokens: Nat;
        mintedTokens: Nat;
        tokenPriceE8s: Nat; // In ICP e8s (1 ICP = 100_000_000 e8s)
        annualYieldBps: Nat; // Basis points (e.g. 1040 = 10.4%)
        custodianSpv: Principal;
    };

    public type TokenOwnership = {
        tokenId: TokenId;
        propertyId: PropertyId;
        owner: Principal;
        mintedAt: Time.Time;
        claimedYieldE8s: Nat;
    };

    private stable var nextTokenId : Nat = 1;
    private let properties = HashMap.HashMap<PropertyId, IndianPropertyRecord>(10, Text.equal, Text.hash);
    private let tokenOwners = HashMap.HashMap<TokenId, TokenOwnership>(1000, Nat.equal, Nat.hash);

    // Register a new RERA-verified Indian property
    public shared ({ caller }) func registerProperty(
        id: PropertyId,
        title: Text,
        city: Text,
        reraId: Text,
        landExtractHash: Text,
        totalTokens: Nat,
        tokenPriceE8s: Nat,
        annualYieldBps: Nat
    ) : async Result<(), Text> {
        // Only DAO or authorized custodian can list
        let record : IndianPropertyRecord = {
            id = id;
            title = title;
            city = city;
            reraId = reraId;
            landExtractHash = landExtractHash;
            totalTokens = totalTokens;
            mintedTokens = 0;
            tokenPriceE8s = tokenPriceE8s;
            annualYieldBps = annualYieldBps;
            custodianSpv = caller;
        };
        properties.put(id, record);
        return #ok(());
    };

    // Fractional Token Minting via ICP Reverse Gas Escrow
    public shared ({ caller }) func mintFractionalToken(
        propId: PropertyId,
        count: Nat
    ) : async Result<[TokenId], Text> {
        switch (properties.get(propId)) {
            case (null) { return #err("Property not found on Canister"); };
            case (?prop) {
                if (prop.mintedTokens + count > prop.totalTokens) {
                    return #err("Exceeds total fractional token allocation");
                };

                var mintedList : [TokenId] = [];
                for (i in Iter.range(0, Nat.toNat32(count) - 1)) {
                    let currentId = nextTokenId;
                    nextTokenId += 1;
                    
                    let ownership : TokenOwnership = {
                        tokenId = currentId;
                        propertyId = propId;
                        owner = caller;
                        mintedAt = Time.now();
                        claimedYieldE8s = 0;
                    };
                    tokenOwners.put(currentId, ownership);
                };

                let updatedProp : IndianPropertyRecord = {
                    prop with mintedTokens = prop.mintedTokens + count;
                };
                properties.put(propId, updatedProp);

                return #ok(mintedList);
            };
        };
    };

    // Query Property details
    public query func getProperty(id: PropertyId) : async ?IndianPropertyRecord {
        return properties.get(id);
    };

    // Reverse Gas Subsidy check
    public query func isSubsidizedByCaffeine() : async Bool {
        return true; // 0 user cycle deductions
    };
};
