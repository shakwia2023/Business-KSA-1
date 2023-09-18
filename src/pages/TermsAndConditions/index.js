import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "./styles.scss";
import { scrollTo } from "../../includes/functions";

class TermsAndConditions extends Component {
	componentDidMount() {
		scrollTo("body");
	}

	render() {
		const { t } = this.props;
		const rules = [];
		for (let i = 0; i < 11; i++) {
			rules.push(
				<div key={i} className="rule">
					<p className="rule-title" style={{ fontSize: `${t(`terms_and_conditions.${i}.size`)}px` }}>
						{t(`terms_and_conditions.${i}.title`)}
					</p>
					<p className="rule-description" style={{ fontSize: `${t(`terms_and_conditions.${i}.size`) - 2}px` }}>
						{t(`terms_and_conditions.${i}.description`)}
					</p>
				</div>
			);
		}
		return (
			<div className="page-template rules">
				<div className="page-content">
					<p className="rules-title">{t("terms_conditions")}</p>
					{rules}
				</div>
			</div>
		);
	}
}

export default withTranslation()(TermsAndConditions);
