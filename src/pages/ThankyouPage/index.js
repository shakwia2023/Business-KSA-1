import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { withTranslation } from "react-i18next";
import "./styles.scss";

class ThankyouPage extends Component {
	render() {
		const { t } = this.props;
		return (
			<div className="page-template thankyou-content">
				<div className="page-content">
					<p className="thank-you-title">{t("thankyou")}</p>
					<ThumbUpAltIcon className="thankyou-icon" />
					<p className="thank-you-content">{t("thankyou_text")}</p>
					<p className="thank-you-content">
						{t("order_number")} - <b style={{ color: "var(--primary)" }}>{this.props.match.params.orderNum}</b>
					</p>
					<NavLink className="back-to-home" to="/">
						{t("goto_home_page")}
					</NavLink>
				</div>
			</div>
		);
	}
}

export default withTranslation()(ThankyouPage);
