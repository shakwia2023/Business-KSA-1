import React, { Component } from "react";
import MyTitle from "../MyTitle";
import "./styles.scss";
import Config from "../../includes/config.json";
import i18n from "../../i18n";
import { withTranslation } from "react-i18next";

const week_days = {
	en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
};

class ContactUs extends Component {
	render() {
		const { id, t } = this.props;
		return (
			<div id={id} className="contact-us">
				<MyTitle title={t("contact_us")} subtitle="CONTACT US" />
				<div className="contactus-content">
					<p className="contactus-p-main">{t("opening_hours")}</p>
					{Config.opening_hours.map((openHours, i) => (
						<p key={i} className="contactus-p" style={{ margin: 0 }}>
							<b style={{ display: "inline-flex", width: "120px" }}>{week_days[i18n.language][i]}:</b>
							<label style={{ display: "inline-grid", width: "120px", textAlign: "end" }}>{openHours.from && openHours.to ? `${openHours.from} - ${openHours.to}` : t("closed")}</label>
						</p>
					))}
					{(Config.whatsapp_number || Config.telephone) && <p className="contactus-p-main">{t("phone_service")}</p>}
					{Config.whatsapp_number && (
						<p className="contactus-p">
							<b style={{ display: "inline-flex", width: "120px" }}>{t("whatsapp_number")}:</b>
							<label style={{ display: "inline-grid", width: "120px", textAlign: "end" }}>
								<a href={"https://wa.me/" + Config.whatsapp_number + "?text=" + Config.whatsapp_message} target="_blank" rel="noopener noreferrer" style={{ direction: "ltr" }}>
									{Config.whatsapp_number}
								</a>
							</label>
						</p>
					)}
					{Config.telephone && (
						<p className="contactus-p">
							<b style={{ display: "inline-flex", width: "120px" }}>{t("phone_number")}:</b>
							<label style={{ display: "inline-grid", width: "120px", textAlign: "end" }}>
								<a href={"tel:" + Config.telephone} style={{ direction: "ltr" }}>
									{Config.telephone}
								</a>
							</label>
						</p>
					)}
					<p className="contactus-p-main">{t("location")}</p>
					<p className="contactus-p">{Config.location[i18n.language]}</p>
					<p className="contactus-p">
						<label style={{ display: "inline-grid", width: "120px", textAlign: "end" }}>
							<a href={`https://www.google.com/maps?q=${Config.location.location}`} target="_blank" rel="noreferrer" style={{ textAlign: "center" }}>
								Google Maps
							</a>
						</label>
					</p>
					<p className="contactus-p">
						<label style={{ display: "inline-grid", width: "120px", textAlign: "end" }}>
							<a className="mobile_location" href={`waze://?ll=${Config.location.location}&navigate=yes`} target="_blank" rel="noreferrer" style={{ textAlign: "center" }}>
								Waze
							</a>
							<a className="web_location" href={`https://waze.com/ul?ll=${Config.location.location}&navigate=yes`} target="_blank" rel="noreferrer" style={{ textAlign: "center" }}>
								Waze
							</a>
						</label>
					</p>
				</div>
			</div>
		);
	}
}

export default withTranslation()(ContactUs);
