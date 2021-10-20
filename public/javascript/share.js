Kakao.init('e4bbd02415e762c0b66e8e18c2f6b3e5');

Kakao.Link.createDefaultButton({
  container: '#create-kakao-link-btn',
  objectType: 'feed',
  content: {
    title: 'KIGO 키고',
    description: '#KIgo #광고비용 #견적비교 #우수업체확인 #인플루언서 #고객매칭',
    imageUrl:
      'http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/img/share_img.png',
    link: {
      mobileWebUrl: 'http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/',
      webUrl: 'http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/',
    },
  },
  social: {
    likeCount: 286,
    commentCount: 45,
    sharedCount: 845,
  },
  buttons: [
    {
      title: 'Android',
      link: {
        mobileWebUrl: 'http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/',
        webUrl: 'http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/',
      },
    },
    {
      title: 'Apple',
      link: {
        mobileWebUrl: 'http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/',
        webUrl: 'http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/',
      },
    },
  ],
})