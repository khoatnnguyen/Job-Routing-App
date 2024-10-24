import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import api from "../data/fetchData";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";

const CenterPagination = styled(Pagination)(({ theme }) => ({
  ul: {
    justifyContent: "center",
  },
}));

function Home() {
  const [jobs, setJobs] = useState([]);
  const [pagesTotal, setPagesTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getJobs(page, q);
      setJobs(data.jobs);
      setPagesTotal(data.pagesTotal);
    };
    fetch();
  }, [page, q]);

  return (
    <Container sx={{ p: 3 }} maxWidth="lg">
      {jobs.length > 0 ? (
        <>
          <Grid2 container spacing={3}>
            {jobs.map((job) => (
              <Grid2 key={job.id} item lg={3} md={4} sm={6} xs={12}>
                <JobCard
                  id={job.id}
                  title={job.title}
                  description={job.description}
                  skills={job.skills}
                />
              </Grid2>
            ))}
          </Grid2>
          <CenterPagination
            sx={{ marginTop: "15px" }}
            count={pagesTotal}
            color="primary"
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </>
      ) : (
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          No Result
        </Typography>
      )}
    </Container>
  );
}

export default Home;
