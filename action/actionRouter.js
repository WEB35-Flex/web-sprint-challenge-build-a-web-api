const { json } = require("express");
const express = require("express");

const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.post("/", (req, res) => {
  const action = req.body;

  Actions.insert(action)
    .then((a) => {
      res.status(201).json(a);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/", (req, res) => {
  Actions.get()
    .then((a) => {
      res.status(200).json(a);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Actions.get(id)
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

  Actions.update(id, changes)
    .then((a) => {
      res.status(200).json(a);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
