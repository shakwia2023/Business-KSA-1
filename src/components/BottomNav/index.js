import React, { Component } from "react";
import "./styles.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Config from "../../includes/config.json";
import { withTranslation } from "react-i18next";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

class BottomNav extends Component {
	render() {
		const { t } = this.props;
		return (
			<div className="bottom-nav">
				<div className="bottom-nav-item">
					<NavLink to="/privacy_policy" className="bottom-nav-item route">
						{t("privacy_policy")}
					</NavLink>
					<NavLink to="/terms_and_conditions" className="bottom-nav-item route">
						{t("terms_conditions")}
					</NavLink>
				</div>
				<div className="bottom-nav-item">
					<p className="bottom-nav-item rights">{t("rights_reserved")} - 2023</p>
				</div>
				<div className="bottom-nav-item">
					{(Config.instagram || Config.facebook) && <p className="follow-us">{t("follow_us")}</p>}
					{Config.instagram && (
						<a href={Config.instagram} target="_blank" rel="noreferrer">
							<InstagramIcon className="social-ico" />
						</a>
					)}
					{Config.facebook && (
						<a href={Config.facebook} target="_blank" rel="noreferrer">
							<FacebookIcon className="social-ico" />
						</a>
					)}
				</div>
			</div>
		);
	}
}

export default withTranslation()(BottomNav);
