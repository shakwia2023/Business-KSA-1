import React, { Component } from "react";
import MyTitle from "../MyTitle";
import "./styles.scss";
import { withTranslation } from "react-i18next";
import StarIcon from "@mui/icons-material/Star";

class Services extends Component {
	render() {
		const { id, t } = this.props;
		const our_services = [];
		for (let i = 0; i < 4; i++) {
			our_services.push(
				<div key={i} className="service-box">
					<StarIcon className="service-icon" />
					<p className="service-title">{t(`services.${i}.title`)}</p>
					<p className="service-descripton">{t(`services.${i}.description`)}</p>
				</div>
			);
		}
		return (
			<div id={id} className="services">
				<MyTitle title={t("our_services")} subtitle="Our Services" />
				<div className="services-content">{our_services}</div>
				<div className="what-are-we-doing">
					<p className="what-are-we-doing-p">{t("doing-line1")}</p>
					<br />
					<p className="what-are-we-doing-p">{t("doing-line2")}</p>
					<br />
					<p className="what-are-we-doing-p">{t("doing-line3")}</p>
					<br />
					<p className="what-are-we-doing-p">{t("doing-line4")}</p>
					<br />
					<p className="what-are-we-doing-p">{t("doing-line5")}</p>
				</div>
			</div>
		);
	}
}

export default withTranslation()(Services);
