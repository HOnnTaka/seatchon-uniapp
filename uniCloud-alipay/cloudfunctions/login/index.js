"use strict";
exports.main = async (event, context) => {
  //event为客户端上传的参数
  const { code } = event;
  const res = await uniCloud.request({
    url: "https://api.weixin.qq.com/sns/jscode2session",
    data: {
      appid: "wx48565e71e81ee40a",
      secret: "e329ad5f191de7936cb992860dba9ded",
      js_code: code,
      grant_type: "authorization_code",
    },
  });
  const { openid } = res.data;
  const db = uniCloud.database();
  const { data } = await db
    .collection("user")
    .where({
      _openid: openid,
    })
    .get();
  console.log(data);
  if (data.length === 0) {
    const newuser = await dbJQL.collection("user").add({
      _openid: openid,
      nickName: "",
      avatarUrl: "",
      type: 0,
      stuClass: "",
      stuId: "",
      stuName: "",
    });
  }
  return {
    avatarUrl: data[0]?.avatarUrl,
    nickName: data[0]?.nickName,
    _openid: openid,
    unionId: "",
    type: data[0]?.type,
    stuClass: data[0]?.stuClass,
    stuId: data[0]?.stuId,
    stuName: data[0]?.stuName,
  };
};
