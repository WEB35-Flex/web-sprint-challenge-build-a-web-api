const express = require("express");

const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.post("/", (req, res) => {
  const project = req.body;

  Projects.insert(project)
    .then((p) => {
      res.status(201).json(p);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/", (req, res) => {
  Projects.get()
    .then((p) => {
      res.status(200).json(p);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;

  Projects.getProjectActions(id)
    .then((a) => {
      res.status(200).json(a);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.update(id, changes)
    .then((p) => {
      res.status(200).json(p);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then((p) => {
      res.status(200).json(p);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
