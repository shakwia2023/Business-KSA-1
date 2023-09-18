import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../images/logo.png";
import i18n from "../../i18n";
import CloseIcon from "@mui/icons-material/Close";
import { withTranslation } from "react-i18next";
import { scrollTo } from "../../includes/functions";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Config from "../../includes/config.json";

const header_navs = [
	{
		label: "home",
		to: "/",
		onClick: () => {
			scrollTo("html");
		},
	},
	{
		label: "about",
		to: "/",
		onClick: () => {
			scrollTo("#about");
		},
	},
	{
		label: "our_services",
		to: "/",
		onClick: () => {
			scrollTo("#services");
		},
	},
	{
		label: "submit_report",
		to: "/",
		onClick: () => {
			scrollTo("#submit_report");
		},
	},
	{
		label: "contact_us",
		to: "/",
		onClick: () => {
			scrollTo("#contact_us");
		},
	},
];

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scrolled: window.pageYOffset === 0 ? false : true,
			langSelector: false,
		};
		this.onScreenScroll = this.onScreenScroll.bind(this);
		this.onScreenClick = this.onScreenClick.bind(this);
	}

	componentDidMount() {
		document.addEventListener("click", this.onScreenClick);
		document.addEventListener("scroll", this.onScreenScroll);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.onScreenClick);
		document.removeEventListener("scroll", this.onScreenScroll);
	}

	onScreenClick(e) {
		if (!e.target.closest(".language-selector")) {
			this.setState({ langSelector: false });
		}
	}

	onScreenScroll(e) {
		if (window.pageYOffset === 0) {
			this.setState({ scrolled: false });
		} else {
			this.setState({ scrolled: true });
		}
	}

	toggleMenu(e) {
		if (!e.target.id === "close_btn" && e.target.closest(".header-nav")) return;
		const element = e.target.closest(".header-nav-wrapper").querySelector(".header-nav");
		element.classList.toggle("open");
	}

	changeLanguage(lang) {
		i18n.changeLanguage(lang);
		localStorage.setItem("language", lang);
		if (Config.rtl_languages.includes(lang)) {
			const body = document.querySelector("body");
			if (!body.classList.contains("rtl")) {
				document.querySelector("body").classList.add("rtl");
			}
		} else {
			document.querySelector("body").classList.remove("rtl");
		}
		this.setState({ langSelector: false });
	}

	render() {
		const { scrolled, langSelector } = this.state;
		const { t } = this.props;
		return (
			<div className={scrolled || window.location.pathname !== "/" ? "header scrolled" : "header"}>
				<div className="header-nav-wrapper">
					<MenuIcon className="header-menu-btn" onClick={this.toggleMenu} />
					<div className="header-nav">
						<CloseIcon id="close_btn" onClick={this.toggleMenu} />
						{header_navs.map((nav, i) => (
							<NavLink
								key={i}
								className="nav-btn"
								to={nav.to}
								onClick={(e) => {
									this.toggleMenu(e);
									nav.onClick();
								}}
							>
								{t(nav.label)}
							</NavLink>
						))}
						<div className="header-menu-social">
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
					<div className="language-selector">
						<button className="choose-lang-btn" onClick={() => this.setState({ langSelector: !langSelector })}>
							{i18n.language}
						</button>
						<div className={langSelector ? "language-selector-dd visible" : "language-selector-dd"}>
							<button className="lang-btn" onClick={() => this.changeLanguage("en")}>
								English
							</button>
							<button className="lang-btn" onClick={() => this.changeLanguage("ar")}>
								العربية
							</button>
						</div>
					</div>
				</div>
				<NavLink to="/" onClick={() => scrollTo("html")} className="header-logo-nav">
					<img className="header-logo" src={Logo} alt="" />
				</NavLink>
			</div>
		);
	}
}

export default withTranslation()(Header);
