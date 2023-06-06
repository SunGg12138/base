// 飞书消息卡片
import feishuClient from '../lib/feishu-client';

// 失败卡片
export function failCard({ msg, title }: { title: string, msg: string }) {
    return {
        "elements": [
            {
                "tag": "markdown",
                "content": `${msg}`
            }
        ],
        "header": {
            "template": "red",
            "title": {
                "content": `${title}`,
                "tag": "plain_text"
            }
        }
    };
}

// 回复卡片
export async function replyCard(message_id, card) {
    await feishuClient.im.message.reply({
        data: {
            content: JSON.stringify({
                type: 'template',
                data: card,
            }),
            msg_type: 'interactive',
        },
        path: {
            message_id,
        },
    })
}

// 验证码卡片
export async function codeCard({ phoneNumber, code, useforText, expireAt }: { phoneNumber: string, code: string, useforText: string, expireAt: string }) {
    return {
        "header": {
          "template": "blue",
          "title": {
            "tag": "plain_text",
            "content": "查收验证码"
          }
        },
        "elements": [
          {
            "tag": "markdown",
            "content": `**手机号**: ${phoneNumber}`
          },
          {
            "tag": "div",
            "text": {
              "content": `**验证码**: ${code}`,
              "tag": "lark_md"
            }
          },
          {
            "tag": "markdown",
            "content": `仅在“${useforText}”中使用`
          },
          {
            "tag": "div",
            "text": {
              "tag": "lark_md",
              "content": `验证码有效期至 ${expireAt}。提供给他人可能导致数据安全问题，请勿泄露。`
            },
            "extra": {
              "tag": "img",
              "img_key": "img_v2_d43d274c-90b6-4a1c-88de-3c95dc8a6cbg",
              "alt": {
                "tag": "plain_text",
                "content": "图片"
              }
            }
          }
        ]
    };
}
