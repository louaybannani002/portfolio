import type { IconType } from "react-icons";
import { FaJava, FaMicrosoft } from "react-icons/fa6";
import {
  SiDocker,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithubactions,
  SiJavascript,
  SiJupyter,
  SiKeras,
  SiLangchain,
  SiLaravel,
  SiMlflow,
  SiModelcontextprotocol,
  SiMysql,
  SiNumpy,
  SiNvidia,
  SiCisco,
  SiOpencv,
  SiPandas,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPycharm,
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiTensorflow,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandOpenai, TbBrandTwilio } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

/**
 * Technology name (exactly as written in data/portfolio.ts) → brand icon.
 * Names without an entry render as a mono text pill: add a mapping here when a logo exists.
 */
const TECH_ICONS: Record<string, IconType> = {
  Python: SiPython,
  Java: FaJava,
  PHP: SiPhp,
  JavaScript: SiJavascript,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  Keras: SiKeras,
  "Scikit-learn": SiScikitlearn,
  OpenCV: SiOpencv,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  LangChain: SiLangchain,
  MCP: SiModelcontextprotocol,
  "OpenAI Agent Builder": TbBrandOpenai,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Laravel: SiLaravel,
  "Vue.js": SiVuedotjs,
  Docker: SiDocker,
  MLflow: SiMlflow,
  Git: SiGit,
  "GitHub Actions (CI/CD)": SiGithubactions,
  "Jupyter Notebook": SiJupyter,
  "VS Code": VscVscode,
  PyCharm: SiPycharm,
  Postman: SiPostman,
  Twilio: TbBrandTwilio,
};

export const getTechIcon = (name: string): IconType | undefined => TECH_ICONS[name];

/** Certificate issuer → logo. Unknown or empty issuers get a generic award icon in the UI. */
const ISSUER_ICONS: Record<string, IconType> = {
  Microsoft: FaMicrosoft,
  NVIDIA: SiNvidia,
  Cisco: SiCisco,
};

export const getIssuerIcon = (issuer: string): IconType | undefined => ISSUER_ICONS[issuer];

/** Stable sprite symbol id for a tech/issuer name, e.g. "GitHub Actions (CI/CD)" → "ti-github-actions-ci-cd". */
export const iconId = (name: string) =>
  "ti-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Every mapped icon, for the SVG sprite (each path is emitted once per page). */
export const ALL_ICONS: [id: string, icon: IconType][] = [
  ...Object.entries(TECH_ICONS),
  ...Object.entries(ISSUER_ICONS),
].map(([name, icon]) => [iconId(name), icon]);
