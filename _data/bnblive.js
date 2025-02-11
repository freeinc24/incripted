const { ethers } = require("ethers");

// BSC Public WebSocket RPC Endpoint
const BSC_RPC_WS = "wss://bsc-ws-node.nariox.org"; // Alternative WebSocket RPC
const BSC_RPC_HTTP = "https://bsc-dataseed.binance.org/";

// Initialize Web3 Provider
const provider = new ethers.WebSocketProvider(BSC_RPC_WS);

// Target Input Data Prefix (First 10 bytes of Keccak hash)
const TARGET_PREFIX = "0x81e77b9fa03bfd3b7e6d05fcfd94014b2cda23c7614a12dcf96888262f14a0fb".slice(0, 10);

console.log("Listening for BNB transactions...");

// Monitor Pending Transactions
provider.on("pending", async (txHash) => {
    try {
        const tx = await provider.getTransaction(txHash);
        if (tx && tx.data && tx.data.startsWith(TARGET_PREFIX)) {
            console.log("🚀 Matched Transaction Found!");
            console.log(`🔗 Tx Hash: ${tx.hash}`);
            console.log(`📤 From: ${tx.from}`);
            console.log(`📥 To: ${tx.to}`);
            console.log(`💰 Value: ${ethers.formatEther(tx.value)} BNB`);
            console.log(`🔎 Data: ${tx.data}`);
            console.log("-----------------------------------------");
        }
    } catch (error) {
        console.error("Error fetching transaction:", error);
    }
});