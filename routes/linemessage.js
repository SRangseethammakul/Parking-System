const express = require('express');
const {
    WebhookClient
} = require('dialogflow-fulfillment');
const {Card, Suggestion, Payload} = require('dialogflow-fulfillment');
const router = express.Router();

router.post('/', (req, res) => {
    const agent = new WebhookClient({
        request: req,
        response: res
    });

    function welcome(agent) {
        console.log("---------------------line welcome---------------------------");
        let payloadJson = {
            "type": "flex",
            "altText": "สถานะการณ์โควิด",
            "contents": {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "RECEIPT",
                      "weight": "bold",
                      "color": "#1DB446",
                      "size": "sm"
                    },
                    {
                      "type": "text",
                      "text": "Brown Store",
                      "weight": "bold",
                      "size": "xxl",
                      "margin": "md"
                    },
                    {
                      "type": "text",
                      "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                      "size": "xs",
                      "color": "#aaaaaa",
                      "wrap": true
                    },
                    {
                      "type": "separator",
                      "margin": "xxl"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "margin": "xxl",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Energy Drink",
                              "size": "sm",
                              "color": "#555555"
                            },
                            {
                              "type": "text",
                              "text": "$2.99",
                              "size": "sm",
                              "color": "#111111",
                              "align": "end"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Chewing Gum",
                              "size": "sm",
                              "color": "#555555"
                            },
                            {
                              "type": "text",
                              "text": "$0.99",
                              "size": "sm",
                              "color": "#111111",
                              "align": "end"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Bottled Water",
                              "size": "sm",
                              "color": "#555555"
                            },
                            {
                              "type": "text",
                              "text": "$3.33",
                              "size": "sm",
                              "color": "#111111",
                              "align": "end"
                            }
                          ]
                        },
                        {
                          "type": "separator",
                          "margin": "xxl"
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "margin": "xxl",
                          "contents": [
                            {
                              "type": "text",
                              "text": "ITEMS",
                              "size": "sm",
                              "color": "#555555"
                            },
                            {
                              "type": "text",
                              "text": "3",
                              "size": "sm",
                              "color": "#111111",
                              "align": "end"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "TOTAL",
                              "size": "sm",
                              "color": "#555555"
                            },
                            {
                              "type": "text",
                              "text": "$7.31",
                              "size": "sm",
                              "color": "#111111",
                              "align": "end"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "CASH",
                              "size": "sm",
                              "color": "#555555"
                            },
                            {
                              "type": "text",
                              "text": "$8.0",
                              "size": "sm",
                              "color": "#111111",
                              "align": "end"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "CHANGE",
                              "size": "sm",
                              "color": "#555555"
                            },
                            {
                              "type": "text",
                              "text": "$0.69",
                              "size": "sm",
                              "color": "#111111",
                              "align": "end"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "separator",
                      "margin": "xxl"
                    },
                    {
                      "type": "box",
                      "layout": "horizontal",
                      "margin": "md",
                      "contents": [
                        {
                          "type": "text",
                          "text": "PAYMENT ID",
                          "size": "xs",
                          "color": "#aaaaaa"
                        },
                        {
                          "type": "text",
                          "text": "#743289384279",
                          "color": "#aaaaaa",
                          "size": "xs",
                          "align": "end"
                        }
                      ]
                    }
                  ]
                },
                "styles": {
                  "footer": {
                    "separator": true
                  }
                }
            }
        };
        let payload = new Payload("LINE", payloadJson, {
            sendAsMessage: true
        });
        agent.add(`Welcome to my agent!`);
        agent.add(payload);	
    }
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    agent.handleRequest(intentMap);
});
module.exports = router;