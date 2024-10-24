import companies from "./jobs.json";

async function getJobs(page, q = null) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });

  await promise;

  const jobsPerPage = 6;

  if (q) {
    const filteredJobs = [];

    for (const company of companies) {
      for (const job of company.jobs) {
        if (
          job.title.toLowerCase().includes(q.toLowerCase()) ||
          job.description.toLowerCase().includes(q.toLowerCase()) ||
          job.city.toLowerCase().includes(q.toLowerCase()) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(q.toLowerCase())
          )
        ) {
          filteredJobs.push(job);
        }
      }
    }

    const startIndex = (page - 1) * jobsPerPage;
    const endIndex = Math.min(startIndex + jobsPerPage, filteredJobs.length);
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    const pagesTotal = Math.ceil(filteredJobs.length / jobsPerPage);

    return { jobs: paginatedJobs, pagesTotal };
  } else {
    const allJobs = companies.flatMap((company) => company.jobs);

    const startIndex = (page - 1) * jobsPerPage;
    const endIndex = Math.min(startIndex + jobsPerPage, allJobs.length);
    const paginatedJobs = allJobs.slice(startIndex, endIndex);

    const pagesTotal = Math.ceil(allJobs.length / jobsPerPage);

    return { jobs: paginatedJobs, pagesTotal };
  }
}

async function getJob(id) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
  await promise;

  for (const company of companies) {
    const job = company.jobs.find((job) => job.id === id);
    if (job) return job;
  }
  return null;
}

export { getJobs, getJob };
