#!/usr/bin/env node

const { triggerAsyncId } = require("async_hooks");
const fs = require("fs");
const chalk = require('chalk')

const { lstat } = fs.promises

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    throw new Error(err);
  }
  const statPromises = filenames.map((filename) => {
    return lstat(filename);
  });
  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    console.log(filenames[index], stats.isFile());
  }
});
