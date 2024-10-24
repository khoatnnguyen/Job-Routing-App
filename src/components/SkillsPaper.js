import React from "react";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const ListItem = styled("li")(({ theme }) => ({
  margin: "1px",
}));

function SkillsPaper({ skills, maxSkills = 5 }) {
  const displayedSkills = skills?.slice(0, maxSkills) || [];
  const remainingSkills = skills ? Math.max(skills.length - maxSkills, 0) : 0;

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        boxShadow: 0,
        backgroundColor: (theme) => theme.palette.primary.light,
      }}
      component="ul"
    >
      {displayedSkills.map((skill) => (
        <ListItem key={skill}>
          <Chip
            size="small"
            color="primary"
            label={skill}
            sx={{ paddingBottom: "2px", backgroundColor: "#df4747" }}
          />
        </ListItem>
      ))}
      {remainingSkills > 0 && (
        <ListItem key="more">
          <Chip
            size="small"
            variant="outlined"
            label={`+${remainingSkills} more`}
            sx={{
              paddingBottom: "2px",
              borderColor: "#df4747",
              color: "#df4747",
            }}
          />
        </ListItem>
      )}
    </Paper>
  );
}

export default SkillsPaper;
