import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import AuthContext from "../auth/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import SkillsPaper from "./SkillsPaper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  border: "1px solid black",
  width: "100%",
  maxWidth: "350px",
  minWidth: "270px",
  height: "320px",
  margin: "auto",
  backgroundColor: theme.palette.primary.light,
}));

const TruncatedTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

function JobCard({ description, skills, id, title }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  let location = useLocation();

  const handleClick = () => {
    if (!auth.user) {
      navigate("/login", { state: { from: `/job/${id}` } });
    }
  };

  return (
    <CardStyle variant="outlined" onClick={handleClick}>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        padding="5px"
      >
        <CardContent sx={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: (theme) => theme.palette.common.white, mb: 1 }}
          >
            {title}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Box sx={{ mb: 1 }}>
            <SkillsPaper skills={skills} />
          </Box>
          <TruncatedTypography
            sx={{ color: (theme) => theme.palette.common.white }}
          >
            {description}
          </TruncatedTypography>
        </CardContent>
        <Button
          variant="contained"
          component={Link}
          to={`/job/${id}`}
          state={{ backgroundLocation: location }}
          sx={{ width: "130px", backgroundColor: "#df9e0b" }}
        >
          Learn More
        </Button>
      </Stack>
    </CardStyle>
  );
}

export default JobCard;
