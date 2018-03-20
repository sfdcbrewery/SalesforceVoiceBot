"use strict";
let nforce = require("nforce"),
  SF_CLIENT_ID = "3MVG9g9rbsTkKnAVqCOPKskVT9.3ReQXt2yitXZO8aD9nR1pXPaTaWt4AHvIljUoJOiYeFq3qNbpRUY_SfgG.",
  SF_CLIENT_SECRET = "3564250950589845530", //3564250950589845530
  SF_USER_NAME = "sribot@gmail.com", //sribot@gmail.com
  SF_PASSWORD = "Welcome1KvXN5CPZe9iBRhDO7R1KbE55l"; //Welcome1KvXN5CPZe9iBRhDO7R1KbE55l

let org = nforce.createConnection({
    clientId: SF_CLIENT_ID,
    clientSecret: SF_CLIENT_SECRET,
    redirectUri: "http://localhost:3000/oauth/_callback",
    apiVersion: 'v41.0',  // optional, defaults to current salesforce API version
    environment: "production",  // optional, salesforce 'sandbox' or 'production', production default
    mode: "single",
    autoRefresh: "true"
});

let login = () => {
    org.authenticate({username: SF_USER_NAME, password: SF_PASSWORD}, err => {
        if (err) {
            console.error("Authentication error");
            console.error(err);
        } else {
            console.log("Authentication successful");
          }
        });
        };
            /* Get the Account Details*/
        let findAccountDetails = () => {
            return new Promise((resolve, reject) => {
              /*  let q = `SELECT
                            Name,
                            BillingCity,
                            BillingState,
                            BillingCountry
                      FROM Account
                      LIMIT 2`; */
                      /*  let q = `SELECT
                            Name,
                            BillingCity,
                            BillingState,
                            BillingCountry
                      FROM Account
                      LIMIT 2`; */
                      //SELECT Name FROM Account ORDER BY Active__c ASC NULLS FIRST
                      let q = `SELECT
                               Name
                               From Account ORDER BY Active__c LIMIT 10`;

                org.query({query: q}, (err, resp) => {
                    if (err) {
                        reject("An error as occurred");
                    } else {
                        console.log("Got AccountDetails");
                        resolve(resp.records);
                    }
                });
            });
        };


        /* Get the Account Details*/

        /* Get the count of contacts */

         let findCountContacts = () => {
             return new Promise((resolve, reject) => {
                 let q = `SELECT
                             count()
                        FROM Contact`;
                 org.query({query: q}, (err, resp) => {
                     if (err) {
                         reject("An error as occurred");
                     } else {
                         console.log("Got CountContacts");
                         resolve(resp.records);
                     }
                 });
             });
         };
        /* Get the count of contacts */


        /* Get the KOL Participants Information */

         let findKOLParticipantDetails = () => {
             return new Promise((resolve, reject) => {
                /* let q = `SELECT
                             KOL_Name__c,
                             KOL_Program__c,
                             KOL_Country__c,
                             KOL_Specialty__c
                       FROM KOL_Participant__c
                       LIMIT 2`; */
                       let q = `SELECT Name,Speaker__c From Contact Where Speaker__c='Active'
                              LIMIT 5`;
                 org.query({query: q}, (err, resp) => {
                     if (err) {
                         reject("An error as occurred");
                     } else {
                         console.log("Got KOLParticipantDetails");
                         resolve(resp.records);
                     }
                 });
             });
         };

        /* Get the KOL Participant Details */

        /* Get the KOL Program Information */
         let findKOLProgramDetails = () => {
             return new Promise((resolve, reject) => {
                 /*let q = `SELECT
                             Event_Title__c,
                             KOL_Event_Owner__c
                        FROM KOL_Program__c
                        LIMIT 2`; */
                      let q = `SELECT
                                    Event_Title__c,
                                    KOL_Event_Owner__c
                               FROM KOL_Program__c
                               LIMIT 5`;
                 org.query({query: q}, (err, resp) => {
                     if (err) {
                         reject("An error as occurred");
                     } else {
                         console.log("Got KOLProgramDetails");
                         resolve(resp.records);
                     }
                 });
             });
         };
         login();
         exports.org = org;
         exports.findAccountDetails = findAccountDetails;
         exports.findCountContacts = findCountContacts;
         exports.findKOLParticipantDetails = findKOLParticipantDetails;
         exports.findKOLProgramDetails = findKOLProgramDetails;
    /* Queries Being Used
  1->   SELECT Name,BillingCity,BillingState,BillingCountry FROM Account limit 2
  2->  SELECT count() FROM Contact
  3->  SELECT KOL_Name__c,KOL_Country__c,KOL_Program__c,KOL_Specialty__c FROM KOL_Participant__c LIMIT 2
  4->  SELECT Event_Title__c,KOL_Event_Owner__c FROM KOL_Program__c LIMIT 2
   Queries Being Used*/


   /* KOL Program Information*/
