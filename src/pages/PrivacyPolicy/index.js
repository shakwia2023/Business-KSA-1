import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "./styles.scss";
import { scrollTo } from "../../includes/functions";

class PrivacyPolicy extends Component {
	componentDidMount() {
		scrollTo("body");
	}

	render() {
		const { t } = this.props;
		const rules = [];
		for (let i = 0; i < 16; i++) {
			rules.push(
				<div key={i} className="rule">
					<p className="rule-title" style={{ fontSize: `${t(`policies.${i}.size`)}px` }}>
						{t(`policies.${i}.title`)}
					</p>
					<p className="rule-description" style={{ fontSize: `${t(`policies.${i}.size`) - 2}px` }}>
						{t(`policies.${i}.description`)}
					</p>
				</div>
			);
		}
		return (
			<div className="page-template rules">
				<div className="page-content">
					<p className="rules-title">{t("privacy_policy")}</p>
					{rules}
				</div>
			</div>
		);
	}
}

export default withTranslation()(PrivacyPolicy);
