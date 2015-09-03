    // people
      // var mom = {name:'mom',  jobs:{}},
      //   dad   = {name:'dad',  jobs:{}},
      //   billy = {name:'billy',jobs:{}},
      //   sally = {name:'sally',jobs:{}};

      // jobs
      // var wash = {job:'wash',who:{}},
      //   dry    = {job:'dry', who:{}},
      //   mop    = {job:'mop', who:{}},
      //   cook   = {job:'cook',who:{}};

      // var people = {
      //   mom: mom,
      //   dad: dad,
      //   billy: billy,
      //   sally: sally
      // };

      // var jobs = {
      //   mop: mop,
      //   cook: cook,
      //   wash: wash,
      //   dry: dry
      // };

      // wash.who = {mom: mom, billy: billy};
      // dry.who  = {dad: dad, billy: billy, sally: sally};
      // cook.who = {dad: dad, sally: sally};
      // mop.who  = {dad: dad, mom: mom};

      // mom.jobs   = {wash: wash, mop: mop};
      // dad.jobs   = {dry: dry, cook: cook, mop: mop};
      // sally.jobs = {dry: dry, cook: cook};
      // billy.jobs = {wash: wash, dry: dry};



// Checks to see if the given user (string) has the given badge (string).  Returns true or false.
    //   var jobs = people[person].jobs;
    //   return job in jobs;
    // };

// function hasBadge(userName, badge) {
//   var badges = users[userName].badges;
//   return badge in badges;
// };



// Checks to see if the given user (object) has the given badge (object).  Returns true or false.
    // function hasJob(personObj, jobObj) {
    //   var jobs = personObj.jobs;
    //   var jobName = jobObj.job;
    //   return jobName in jobs;
    // };

function hasBadge(user, badgeObj) {
  var badges = user.badges;
  var badgeName = badgeObj.name;
  return badgeName in badges;
};



// Checks to see which users (objects) have earned the given badge (object).  Returns an array of user-objects.
    // function peopleDoing(job) {
    //   var whoObject = jobs[job].who;
    //   var response = [];
    //   for(var person in whoObject) {
    //     response.push(whoObject[person]);
    //   }
    //   return response;
    // };

function usersWhoEarned(badge) {
  var whoObject = badges[badge].who();
  var response = [];
  for(var user in whoObject) {
    response.push(whoObject[user]);
  }
  return response;
};



// Checks to see which badges (objects) have been earned by the given user (object). Returns an array of badge-objects
    // function jobsDoneBy(person) {
    //   var jobsObject = people[person].jobs;
    //   var response = [];
    //   for(var job in jobsObject) {
    //     response.push(jobsObject[job]);
    //   }
    //   return response;
    // };

function badgesEarnedBy(user) {
  var badgesObject = users[user].badges;
  var response = [];
  for(var badge in badgesObject) {
    response.push(badgesObject[badge]);
  }
  return response;
};



// Determines which badges (strings) have been earned by both of the given users (strings). Returns an array of badgeName-strings.
    // function intersectJobs(nameA, nameB) {
    //   var jobsA = [];
    //   var a = jobsDoneBy(nameA);
    //   for(var jobObject in a) {jobsA.push(a[jobObject].job);}
    //
    //   var jobsB = [];
    //   var b = jobsDoneBy(nameB);
    //   for(var jobObject in b) {jobsB.push(b[jobObject].job);}
    //
    //   return _.intersection(jobsA, jobsB);
    // };

function intersectBadges(userNameA, userNameB) {
  var badgesA = [];
  var a = badgesEarnedBy(userNameA);
  for(var badgeObject in a) {badgesA.push(a[badgeObject].name);}

  var badgesB = [];
  var b = badgesEarnedBy(userNameB);
  for(var badgeObject in b) {badgesB.push(b[badgeObject].name);}

  return _.intersection(badgesA, badgesB);
};



// Calculates a measurement that represents the similarity of the badges earned by the given users (objects). Returns a number from 0 to 1.
    // function similarity(personA, personB) {
    //   var jobCountA = jobsDoneBy(personA.name).length;
    //   var jobCountB = jobsDoneBy(personB.name).length;
    //   var jobCountShared = intersectJobs(personA.name, personB.name).length;
    //   var maxCount = Math.max(jobCountA, jobCountB);
    //   return jobCountShared/maxCount;
    // };

function similarity(userA, userB) {
  var badgeCountA = badgesEarnedBy(userA.name).length;
  var badgeCountB = badgesEarnedBy(userB.name).length;
  var badgeCountShared = intersectBadges(userA.name, userB.name).length;
  var maxCount = Math.max(badgeCountA, badgeCountB);
  return badgeCountShared/maxCount;
};



// Calculates a measurement ("score") that represents the compatibility of the given badge (object) for the given user (object). Returns a number.
    // function score(job, person) {
    //   var personObjectsArray = peopleDoing(job.job);
    //   var total = 0;
    //
    //   for(var personObject in personObjectsArray) {
    //     total += similarity(personObjectsArray[personObject], person);
    //   }
    //
    //   return total;
    // };

function score(badge, user) {
  var userObjectsArray = usersWhoEarned(badge.name);
  var total = 0;

  for(var userObject in userObjectsArray) {
    total += similarity(userObjectsArray[userObject], user);
  }

  return total;
};



// Returns an array of objects that each contain a possible new badge (object) and its related compatibility score for the given user (object).
    // function recommendJobsFor(person) {
    //   var allJobObjects = [];
    //   for(var jobKey in jobs) {allJobObjects.push(jobs[jobKey]);}
    //
    //   var personJobObjects = [];
    //   for(var jobKey in person.jobs) {personJobObjects.push(person.jobs[jobKey]);}
    //
    //   var possibleJobs = _.difference(allJobObjects, personJobObjects);
    //
    //   for(var job in possibleJobs) {
    //     if(score(possibleJobs[job], person) === 0) {delete possibleJobs[job];}
    //   }
    //
    //   var recommendedJobs = [];
    //   for(var job in possibleJobs) {
    //     recommendedJobs.push({
    //       job: possibleJobs[job]
    //     });
    //   }
    //
    //   for(var newJob in recommendedJobs) {
    //     var compatibilityScore = score(recommendedJobs[newJob].job, person);
    //     recommendedJobs[newJob].score = compatibilityScore;
    //   }
    //
    //   function descScore(objectA, objectB) {
    //     if(objectA.score > objectB.score) {
    //       return -1;
    //     } else {
    //       return 1;
    //     }
    //   }
    //
    //   recommendedJobs.sort(descScore);
    //   return recommendedJobs;
    // };

function recommendBadgesFor(user) {
  var allBadgeObjects = [];
  for(var badgeKey in badges) {allBadgeObjects.push(badges[badgeKey]);}

  var userBadgeObjects = [];
  for(var badgeKey in user.badges) {userBadgeObjects.push(user.badges[badgeKey]);}

  var possibleBadges = _.difference(allBadgeObjects, userBadgeObjects);

  for(var badge in possibleBadges) {
    if(score(possibleBadges[badge], user) === 0) {delete possibleBadges[badge];}
  }

  var recommendedBadges = [];
  for(var badge in possibleBadges) {
    recommendedBadges.push({
      badge: possibleBadges[badge]
    });
  }

  for(var newBadge in recommendedBadges) {
    var compatibilityScore = score(recommendedBadges[newBadge].badge, user);
    recommendedBadges[newBadge].score = compatibilityScore;
  }

  function descScore(objectA, objectB) {
    if(objectA.score > objectB.score) {
      return -1;
    } else {
      return 1;
    }
  }

  recommendedBadges.sort(descScore);
  return recommendedBadges;
};



if(typeof module !== "undefined") {
	module.exports = {
    hasBadge: hasBadge,
    usersWhoEarned: usersWhoEarned,
    badgesEarnedBy: badgesEarnedBy,
    intersectBadges: intersectBadges,
    similarity: similarity,
    score: score,
    recommendBadgesFor: recommendBadgesFor
  };
}
