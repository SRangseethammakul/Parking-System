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
                            "text": "สถานะการณ์โควิด",
                            "margin": "md",
                            "size": "xxl",
                            "style": "normal",
                            "weight": "regular",
                            "align": "start",
                            "gravity": "center",
                            "wrap": true,
                            "color": "#4ecdc4"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "วันที่",
                                    "color": "#aaaaaa"
                                },
                                {
                                    "type": "text",
                                    "text": "5",
                                    "color": "#aaaaaa"
                                }
                            ],
                            "spacing": "md",
                            "margin": "xl"
                        },
                        {
                            "type": "separator",
                            "margin": "xxl"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "ข้อมูลประจำวัน",
                                    "align": "center"
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "ติดเชื้อ"
                                        },
                                        {
                                            "type": "text",
                                            "text": "10",
                                            "size": "sm",
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
                                            "text": "รักษาอยู่"
                                        },
                                        {
                                            "type": "text",
                                            "text": "10",
                                            "size": "sm",
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
                                            "text": "หายแล้ว"
                                        },
                                        {
                                            "type": "text",
                                            "text": "10",
                                            "size": "sm",
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
                                            "text": "เสียชีวิต"
                                        },
                                        {
                                            "type": "text",
                                            "text": "10",
                                            "size": "sm",
                                            "align": "end"
                                        }
                                    ]
                                }
                            ],
                            "spacing": "sm",
                            "margin": "xl"
                        },
                        {
                            "type": "separator",
                            "margin": "xxl"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "ข้อมูลสะสม",
                                    "align": "center"
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "ติดเชื้อ"
                                        },
                                        {
                                            "type": "text",
                                            "text": "5",
                                            "size": "sm",
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
                                            "text": "รักษาอยู่"
                                        },
                                        {
                                            "type": "text",
                                            "text": "5",
                                            "size": "sm",
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
                                            "text": "หายแล้ว"
                                        },
                                        {
                                            "type": "text",
                                            "text": "5",
                                            "size": "sm",
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
                                            "text": "เสียชีวิต"
                                        },
                                        {
                                            "type": "text",
                                            "text": "5",
                                            "size": "sm",
                                            "align": "end"
                                        }
                                    ]
                                }
                            ],
                            "spacing": "sm",
                            "margin": "xl"
                        }
                    ]
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