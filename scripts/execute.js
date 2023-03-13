const { ethers } = require("hardhat");
const { keccak256, toUtf8Bytes } = ethers.utils;
const { token_address, governor_address } = require("./deployment");

async function main() {
	const governor = await ethers.getContractAt("MyGovernor", governor_address);
	const token = await ethers.getContractAt("MyToken", token_address);

	const [owner] = await ethers.getSigners();

	const calldata = token.interface.encodeFunctionData(
		"mint",
		[owner.address, ethers.utils.parseEther("2300")]
	);

	await governor.execute([token_address], [0], [calldata], keccak256(toUtf8Bytes("Gimme more!!")));

	const balance = await token.balanceOf(owner.address);

	console.log("Executed the proposal");
	console.log("Owner balance after execution:", balance);
}

main().catch(e => {
	console.log(e);
	process.exitCode = 1;
})