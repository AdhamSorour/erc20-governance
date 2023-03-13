const { ethers } = require("hardhat");
const { token_address, governor_address } = require("./deployment");

async function main() {
	const PROPOSAL_ID = ethers.BigNumber.from("25061011271572925974448190605372131364094776632182676967130781078148599867675");

	const governor = await ethers.getContractAt("MyGovernor", governor_address);
	const token = await ethers.getContractAt("MyToken", token_address);

	const [owner] = await ethers.getSigners();
	await token.delegate(owner.address);

	await governor.castVote(PROPOSAL_ID, 1);

	console.log("Voted YES on proposal", PROPOSAL_ID);
}

main().catch(e => {
	console.log(e);
	process.exitCode = 1;
})