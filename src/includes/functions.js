import axios from "axios";
import configData from "./config.json";
const Buffer = require("buffer/").Buffer;

export async function createAxiosCall(callMethod, rest, request) {
	const username = configData.Authorization.username;
	const password = configData.Authorization.password;
	const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");
	let response = null;
	try {
		response = await axios({
			method: callMethod,
			url: configData.server_URI + "/" + rest,
			data: request,
			headers: {
				Authorization: `Basic ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data);
		} else {
			throw new Error("please check your internet connection and try again.");
		}
	}
}

export function scrollTo(e) {
	window.location.hash = e;
	window.addEventListener("hashchange", () => {
		const section = document.querySelector(e);
		if (section) {
			window.scrollTo(0, section.offsetTop - 90);
		}
	});
	window.location.hash = "";
}

export function generateRandomNumber(length = 9) {
	return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}
