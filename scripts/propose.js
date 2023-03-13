const { ethers } = require("hardhat");
const { token_address, governor_address } = require("./deployment");

async function main() {
	const governor = await ethers.getContractAt("MyGovernor", governor_address);
	const token = await ethers.getContractAt("MyToken", token_address);

	const [owner] = await ethers.getSigners();
	const calldata = token.interface.encodeFunctionData(
		"mint",
		[owner.address, ethers.utils.parseEther("2300")]
	);

	const proposal = await governor.propose([token_address], [0], [calldata], "Gimme more!!");
	const receipt = await proposal.wait();
	const event = receipt.events.find(i => i.event === "ProposalCreated");

	console.log("Proposal submitted!");
	console.log("ID:", event.args.proposalId);
}

main().catch(e => {
	console.log(e);
	process.exitCode = 1;
})