const express = require('express');
const {
    WebhookClient
} = require('dialogflow-fulfillment');
const {Card, Suggestion, Payload} = require('dialogflow-fulfillment');
const router = express.Router();
const {getCovid} = require('../controller/linemessage');
router.get('/',async (req ,res) => {
    const dataCovid = await getCovid();
    console.log(dataCovid);
    return res.status(200).json({
        status: true,
        data: dataCovid,
    });
});
router.post('/', (req, res) => {
    const agent = new WebhookClient({
        request: req,
        response: res
    });
    async function welcome(agent) {
        try{
            console.log("---------------------line welcome---------------------------");
            const dataCovid = await getCovid();
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
                                        "text": `${dataCovid.UpdateDate}`,
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
                                                "text": `${dataCovid.NewConfirmed}`,
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
                                                "text": `${dataCovid.NewHospitalized}`,
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
                                                "text": `${dataCovid.NewRecovered}`,
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
                                                "text": `${dataCovid.NewDeaths}`,
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
                                                "text": `${dataCovid.Confirmed}`,
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
                                                "text": `${dataCovid.Hospitalized}`,
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
                                                "text": `${dataCovid.Recovered}`,
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
                                                "text": `${dataCovid.Deaths}`,
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
        } catch (error) {
            console.error(error);
        }
    }
    async function covid19(agent) {
        try{
            console.log("---------------------line welcome---------------------------");
            const dataCovid = await getCovid();
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
                                        "text": `${dataCovid.UpdateDate}`,
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
                                                "text": `${dataCovid.NewConfirmed}`,
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
                                                "text": `${dataCovid.NewHospitalized}`,
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
                                                "text": `${dataCovid.NewRecovered}`,
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
                                                "text": `${dataCovid.NewDeaths}`,
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
                                                "text": `${dataCovid.Confirmed}`,
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
                                                "text": `${dataCovid.Hospitalized}`,
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
                                                "text": `${dataCovid.Recovered}`,
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
                                                "text": `${dataCovid.Deaths}`,
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
            agent.add(payload);
        } catch (error) {
            console.error(error);
        }
    }
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Covid-19', covid19);
    agent.handleRequest(intentMap);
});
module.exports = router;