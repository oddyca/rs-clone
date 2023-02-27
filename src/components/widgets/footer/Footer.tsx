import "../../../style/footer.css";

import rss from "../../../assets/rs_school_js.svg";
import github from "../../../assets/github_mark.svg";

export default function Footer() {
  return (
    <div className="footer">
        <a
            href="https://rs.school/js/"
            target="_blank"
            className="footer_rs-logo"
        >
            <img 
                src={rss} 
                alt="rss logo"
                className="rss-logo"
                style={{width:"auto", height:"48px"}}
            />
        </a>
        <div
            className="footer_githubs"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "24px"
            }}
        >
            <div 
                className="github"
                style={{
                    display: "flex",
                    alignItems:"center",
                    gap: "8px"
                }}
            >
                <img 
                    src={github} alt="github logo"
                    className="github-logo"
                    style={{
                        width:"auto",
                        height:"36px"
                    }}
                />
                <a 
                    className="github-link"
                    href="https://github.com/oddyca"
                    target="_blank"
                >
                oddyca
                </a>
            </div>
            <div 
                className="github"
                style={{
                    display: "flex",
                    alignItems:"center",
                    gap: "8px"
                }}
            >
                <img 
                    src={github} alt="github logo"
                    className="github-logo"
                    style={{
                        width:"auto",
                        height:"36px"
                    }}
                />
                <a 
                    className="github-link"
                    href="https://github.com/mclakov"
                    target="_blank"
                >
                mclakov
                </a>
            </div>
            <div 
                className="github"
                style={{
                    display: "flex",
                    alignItems:"center",
                    gap: "8px"
                }}
            >
                <img 
                    src={github} alt="github logo"
                    className="github-logo"
                    style={{
                        width:"auto",
                        height:"36px"
                    }}
                />
                <a 
                    className="github-link"
                    href="https://github.com/shzFas"
                    target="_blank"
                >
                shzfas
                </a>
            </div>
        </div>
        <div className="footer_year">2023</div>
    </div>
  )
}
