import React, { Component } from "react";
import MyTitle from "../MyTitle";
import "./styles.scss";
import { withTranslation } from "react-i18next";
import { Button, TextField } from "@mui/material";
import { createAxiosCall, generateRandomNumber } from "../../includes/functions";
import Config from "../../includes/config.json";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

class SubmitReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error_message: "",
		};
		this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
	}

	async handleSubmitBtn(e) {
		e.preventDefault();
		const { history, t } = this.props;
		if (!e.target.acceptPolicy.checked) {
			this.setState({
				error_message: t("rules_error"),
			});
			return;
		}
		e.target.submitBtn.disabled = true;
		const order_number = generateRandomNumber();
		const request = {
			full_name: e.target.full_name.value.substring(0, 55),
			location: "",
			email: e.target.email.value.substring(0, 55),
			phone_number: e.target.phone_number.value,
			details: e.target.details.value,
			owner_id: process.env.REACT_APP_OWNER_ID || 1,
			order_number: order_number,
			source: Config.campaignName,
		};
		await createAxiosCall("POST", "clients/add-new-lead", request);
		e.target.submitBtn.disabled = false;
		e.target.reset();
		history.push("/thankyou/" + order_number);
	}

	render() {
		const { error_message } = this.state;
		const { id, t } = this.props;
		return (
			<div id={id} className="submit_report">
				<MyTitle title={t("submit_report")} subtitle="Submit a report" />
				<div className="submit-report-content">
					<p className="form-title">{t("form_title")}</p>
					<p className="form-description">{t("form_description")}</p>
					<form className="form-container" onSubmit={this.handleSubmitBtn} onChange={() => this.setState({ error_message: "" })}>
						<TextField
							sx={{
								"& .MuiInputLabel-root.Mui-focused": {
									color: "var(--main-color)",
								},
								"& .MuiFilledInput-root": {
									"&:after": {
										borderColor: "var(--main-color)",
									},
								},
							}}
							className="form-input"
							label={t("form_full_name")}
							variant="filled"
							name="full_name"
							required
						/>
						<TextField
							sx={{
								"& .MuiInputLabel-root.Mui-focused": {
									color: "var(--main-color)",
								},
								"& .MuiFilledInput-root": {
									"&:after": {
										borderColor: "var(--main-color)",
									},
								},
							}}
							className="form-input"
							label={t("form_email")}
							type="email"
							variant="filled"
							name="email"
							required
						/>
						<TextField
							sx={{
								"& .MuiInputLabel-root.Mui-focused": {
									color: "var(--main-color)",
								},
								"& .MuiFilledInput-root": {
									"&:after": {
										borderColor: "var(--main-color)",
									},
								},
							}}
							className="form-input"
							label={t("form_phone_number")}
							type="number"
							inputMode="numeric"
							variant="filled"
							name="phone_number"
							required
							onWheel={(e) => e.target.blur()}
						/>
						<TextField
							sx={{
								"& .MuiInputLabel-root.Mui-focused": {
									color: "var(--main-color)",
								},
								"& .MuiFilledInput-root": {
									"&:after": {
										borderColor: "var(--main-color)",
									},
								},
							}}
							className="form-input"
							label={t("form_details")}
							multiline
							rows={5}
							variant="filled"
							name="details"
							required
						/>
						<div className="accept-policy-line">
							<input className="accept-policy-cb" type="checkbox" id="acceptPolicy" name="acceptPolicy" />
							<label className="accept-policy-text" htmlFor="acceptPolicy">
								{t("agree_terms") + " "}
								<NavLink className="accept-policy" to="/terms_and_conditions">
									{t("terms_conditions")}
								</NavLink>{" "}
								{"" + t("and") + " "}
								<NavLink className="accept-policy" to="/privacy_policy">
									{t("privacy_policy")}
								</NavLink>
							</label>
						</div>
						<p className="error-message">{error_message}</p>
						<Button className="form-button" variant="contained" type="submit" name="submitBtn">
							{t("form_button_value")}
						</Button>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(withTranslation()(SubmitReport));
