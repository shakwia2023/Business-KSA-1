import React, { Component } from "react";
import MyTitle from "../MyTitle";
import "./styles.scss";
import { withTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { scrollTo } from "../../includes/functions";

class About extends Component {
	render() {
		const { id, t } = this.props;
		return (
			<div id={id} className="about">
				<MyTitle title={t("about")} subtitle="About" />
				<div className="about-content">
					<p className="about-p">{t("aboutLine1")}</p>
					<br />
					<p className="about-p">{t("aboutLine2")}</p>
					<br />
					<p className="about-p">{t("aboutLine3")}</p>
					<br />
					<br />
					<Button
						className="scroll-to-form-btn"
						variant="contained"
						onClick={() => {
							scrollTo("#submit_report");
						}}
					>
						{t("start_now")}
					</Button>
				</div>
			</div>
		);
	}
}

export default withTranslation()(About);
