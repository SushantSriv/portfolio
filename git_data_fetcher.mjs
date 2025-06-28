import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const openSource = {
  githubConvertedToken: process.env.GITHUB_TOKEN,
  githubUserName: process.env.GITHUB_USERNAME,
};

const repoLimit = process.env.PROJECTS_LIMIT || 9;

const query_pr = {
  query: `
	query {
	  user(login: "${openSource.githubUserName}"){
	    pullRequests(last: 100, orderBy: {field: CREATED_AT, direction: DESC}){
      totalCount
      nodes{
        id
        title
        url
        state
	      mergedBy {
	          avatarUrl
	          url
	          login
	      }
	      createdAt
	      number
        changedFiles
	      additions
	      deletions
        baseRepository {
	          name
	          url
	          owner {
	            avatarUrl
	            login
	            url
	          }
	        }
      }
    }
	}
}
	`,
};

const query_issue = {
  query: `query{

		user(login: "${openSource.githubUserName}") {
    issues(last: 100, orderBy: {field:CREATED_AT, direction: DESC}){
      totalCount
      nodes{
      	id
        closed
        title
        createdAt
        url
        number
        assignees(first:100){
          nodes{
            avatarUrl
            name
            url
          }
        }
        repository{
          name
          url
          owner{
            login
            avatarUrl
            url
          }
        }
      }
    }
  }

	}`,
};

const query_org = {
  query: `query{
	user(login: "${openSource.githubUserName}") {
	    repositoriesContributedTo(last: 100){
	      totalCount
	      nodes{
	        owner{
	          login
	          avatarUrl
	          __typename
	        }
	      }
	    }
	  }
	}`,
};

const query_recent_projects = {
  query: `
    query {
      user(login: "${openSource.githubUserName}") {
        repositories(
          first: ${repoLimit},
          privacy: PUBLIC,
          ownerAffiliations: OWNER,
          isFork: false,
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            id
            name
            createdAt
            url
            description
            isFork
            languages(first: 10) {
              nodes { name }
            }
          }
        }
      }
    }
  `,
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + openSource.githubConvertedToken,
};

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(query_pr),
})
  .then((response) => response.text())
  .then((txt) => {
    const data = JSON.parse(txt);
    var cropped = { data: [] };
    cropped["data"] = data["data"]["user"]["pullRequests"]["nodes"];

    var open = 0;
    var closed = 0;
    var merged = 0;
    for (var i = 0; i < cropped["data"].length; i++) {
      if (cropped["data"][i]["state"] === "OPEN") open++;
      else if (cropped["data"][i]["state"] === "MERGED") merged++;
      else closed++;
    }

    cropped["open"] = open;
    cropped["closed"] = closed;
    cropped["merged"] = merged;
    cropped["totalCount"] = cropped["data"].length;

    console.log("Fetching the Pull Request Data.\n");
    fs.writeFile(
      "./src/shared/opensource/pull_requests.json",
      JSON.stringify(cropped),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  })
  .catch((error) => console.log(JSON.stringify(error)));

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(query_issue),
})
  .then((response) => response.text())
  .then((txt) => {
    const data = JSON.parse(txt);
    var cropped = { data: [] };
    cropped["data"] = data["data"]["user"]["issues"]["nodes"];

    var open = 0;
    var closed = 0;
    for (var i = 0; i < cropped["data"].length; i++) {
      if (cropped["data"][i]["closed"] === false) open++;
      else closed++;
    }

    cropped["open"] = open;
    cropped["closed"] = closed;
    cropped["totalCount"] = cropped["data"].length;

    console.log("Fetching the Issues Data.\n");
    fs.writeFile(
      "./src/shared/opensource/issues.json",
      JSON.stringify(cropped),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  })
  .catch((error) => console.log(JSON.stringify(error)));

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(query_org),
})
  .then((response) => response.text())
  .then((txt) => {
    const data = JSON.parse(txt);
    const orgs = data["data"]["user"]["repositoriesContributedTo"]["nodes"];
    var newOrgs = { data: [] };
    for (var i = 0; i < orgs.length; i++) {
      var obj = orgs[i]["owner"];
      if (obj["__typename"] === "Organization") {
        var flag = 0;
        for (var j = 0; j < newOrgs["data"].length; j++) {
          if (JSON.stringify(obj) === JSON.stringify(newOrgs["data"][j])) {
            flag = 1;
            break;
          }
        }
        if (flag === 0) {
          newOrgs["data"].push(obj);
        }
      }
    }

    console.log("Fetching the Contributed Organization Data.\n");
    fs.writeFile(
      "./src/shared/opensource/organizations.json",
      JSON.stringify(newOrgs),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  })
  .catch((error) => console.log(JSON.stringify(error)));

    fetch(baseUrl, {
  method: "POST",
  headers,
  body: JSON.stringify(query_recent_projects),
})
  .then((r) => r.json())
  .then((raw) => {
    const repos = raw.data.user.repositories.nodes;

    const newProjects = { data: [] };

    repos.forEach((repo) => {
      const iconMap = {
        // -------------  Back-end, språk, data  -------------
        Python: "logos-python",
        "Jupyter Notebook": "logos-jupyter",
        R: "logos-r-lang",
        MATLAB: "simple-icons:matlab",
        Java: "logos-java",
        "C#": "simple-icons:csharp",
        "C++": "logos:c-plusplus",
        "C": "logos:c",
        Go: "logos-go",
        Rust: "logos-rust",
        PHP: "logos-php",
        Ruby: "logos-ruby",
        PowerShell: "simple-icons:powershell",
        Bash: "simple-icons:gnubash",
        Shell: "simple-icons:shell",
        Dockerfile: "simple-icons:docker",
        YAML: "simple-icons:yaml",
        JSON: "simple-icons:json",
        SQL: "simple-icons:mysql",
        MySQL: "simple-icons:mysql",
        PostgreSQL: "simple-icons:postgresql",
        MongoDB: "simple-icons:mongodb",
        SQLite: "simple-icons:sqlite",
        Redis: "simple-icons:redis",

        // -------------  Data-science & ML libs  -------------
        TensorFlow: "logos-tensorflow",
        PyTorch: "logos-pytorch",
        "scikit-learn": "simple-icons:scikitlearn",
        pandas: "simple-icons:pandas",
        NumPy: "simple-icons:numpy",
        SciPy: "simple-icons:scipy",
        Matplotlib: "simple-icons:plotly",   // nærmest tilgjengelige icon
        Seaborn: "simple-icons:plotly",
        Plotly: "simple-icons:plotly",
        PySpark: "simple-icons:apachespark",
        Gensim: "simple-icons:gensim",
        NLTK: "simple-icons:nltk",
        "Power BI": "simple-icons:powerbi",

        // -------------  Web & front-end  -------------
        JavaScript: "logos-javascript",
        TypeScript: "logos-typescript",
        HTML: "logos-html-5",
        CSS: "logos-css-3",
        React: "simple-icons:react",
        NextJS: "simple-icons:nextdotjs",
        Angular: "simple-icons:angular",
        Vue: "simple-icons:vuedotjs",
        Svelte: "simple-icons:svelte",
        Vite: "simple-icons:vite",
        Bootstrap: "simple-icons:bootstrap",
        Tailwind: "simple-icons:tailwindcss",
        Leaflet: "simple-icons:leaflet",
        Mapbox: "simple-icons:mapbox",
        ThreeJS: "simple-icons:threedotjs",
        D3: "simple-icons:d3dotjs",

        // -------------  Web-frameworks & APIs  -------------
        Node: "logos-nodejs",
        "Node.js": "logos-nodejs",
        Express: "simple-icons:express",
        FastAPI: "simple-icons:fastapi",
        Django: "simple-icons:django",
        Flask: "simple-icons:flask",
        Spring: "simple-icons:spring",

        // -------------  DevOps, Cloud & IaC  -------------
        Docker: "simple-icons:docker",
        Kubernetes: "simple-icons:kubernetes",
        Terraform: "simple-icons:terraform",
        Ansible: "simple-icons:ansible",
        Jenkins: "simple-icons:jenkins",
        GitHub: "simple-icons:github",
        "GitHub Actions": "simple-icons:githubactions",
        GitLab: "simple-icons:gitlab",
        AWS: "simple-icons:amazonaws",
        Azure: "simple-icons:microsoftazure",
        GCP: "simple-icons:googlecloud",
        SCSS: "simple-icons:sass",   // rosa Sass/SCSS-logo


        // -------------  Desktop & UI toolkits  -------------
        ".NET": "simple-icons:dotnet",
        WPF: "simple-icons:microsoft",
        Electron: "simple-icons:electron",
        Qt: "simple-icons:qt",
        TeX: "simple-icons:latex",      // eller
        LaTeX: "simple-icons:latex",

        // -------------  Fallback  -------------
        Default: "mdi:code-tags",

      };


      const mappedLangs = repo.languages.nodes.map((l) => ({
        name: l.name,
        iconifyClass: iconMap[l.name] || "mdi:code-tags",
      }));

      newProjects.data.push({ ...repo, languages: mappedLangs });
    });

    fs.writeFileSync(
      "./src/shared/opensource/projects.json",
      JSON.stringify(newProjects, null, 2)
    );
    console.log(`Wrote ${newProjects.data.length} repos to projects.json`);
  })
  .catch((err) => console.error("Projects fetch error →", err));
