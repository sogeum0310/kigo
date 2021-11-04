var Model = require('../models/model')

async function createEstimateForm() {

  var topics = []
  var items = []
  var item_details = []

  async function createEstimateTopic(name) {
    var topic = new Model.EstimateTopic({
      name: name,
    })
    await topic.save()
    topics.push(topic) 
  }

  async function createEstimateItem(name, topic) {
    var item = new Model.EstimateItem({
      name: name,
    })

    if (topic!= false) item.topic = topic

    await item.save()
    items.push(item)
  }

  async function createEstimateItemDetail(item, name, input_type, input_name) {
    var item_detail = new Model.EstimateItemDetail({
      item: item,
      name: name,
      input_type: input_type,
      input_name: input_name
    })
    await item_detail.save()
    item_details.push(item_detail)
  }

  ////////////////////////////////////////////////////////////////////////////////////

  // 토픽

  // 온라인 광고
  await createEstimateTopic('검색엔진최적화')
  await createEstimateTopic('바이럴 마케팅') 
  await createEstimateTopic('SNS 계정관리') 
  await createEstimateTopic('인플루언서')
  await createEstimateTopic('언론 홍보(보도자료 송출)')
  await createEstimateTopic('배너 광고')
  await createEstimateTopic('해외/글로벌 마케팅')
  // 기타
  await createEstimateTopic('오프라인 광고')
  await createEstimateTopic('판촉물 제작/배포')

  ////////////////////////////////////////////////////////////////////////////////////
  
  // 토픽 -> 바이럴 마케팅
  await createEstimateItem('원하시는 채널을 선택해주세요', topics[1]._id)
  // 토픽 -> SNS 계정관리
  await createEstimateItem('원하시는 채널을 선택해주세요', topics[2]._id)
  await createEstimateItem('월간 몇회 정도의 작업(포스팅)을 생각하고 계신가요?', topics[2]._id)
  // 토픽 -> 공통
  await createEstimateItem('광고 하실 업종 또는 상품을 선택해주세요(중복 선택 가능)', false)
  await createEstimateItem('광고 목적을 선택해주세요(중복 선택 가능)', false)
  await createEstimateItem('원하시는 광고 시작 날짜를 선택해주세요', false)
  await createEstimateItem('원하시는 광고 집행 기간을 선택해주세요', false)
  await createEstimateItem('원하시는 대략적인 예상 금액을 입력해주세요', false)
  await createEstimateItem('고객님이 계신 지역을 선택해주세요(중복 선택 가능)', false)
  await createEstimateItem('원하시는 피드백 서비스를 선택해주세요(중복 선택 가능)', false)

  ////////////////////////////////////////////////////////////////////////////////////

  // 바이럴 마케팅 -> 원하시는 채널을 선택해주세요
  await createEstimateItemDetail(items[0]._id, '네이버 블로그 체험단/기자단', 'checkbox', 'field1')
  await createEstimateItemDetail(items[0]._id, '유튜브 체험단/기자단', 'checkbox', 'field1')
  await createEstimateItemDetail(items[0]._id, '인스타그램 체험단/기자단','checkbox', 'field1')
  await createEstimateItemDetail(items[0]._id, '페이스북 체험단/기자단', 'checkbox', 'field1')
  await createEstimateItemDetail(items[0]._id, '네이버 카페 침투 마케팅', 'checkbox', 'field1')
  await createEstimateItemDetail(items[0]._id, '커뮤니티 침투 마케팅', 'checkbox', 'field1')
  await createEstimateItemDetail(items[0]._id, '네이버 지식인 마케팅', 'checkbox', 'field1')
  await createEstimateItemDetail(items[0]._id, '네이버 리뷰 마케팅', 'checkbox', 'field1')
  

  // SNS 계정관리 -> 원하시는 채널을 선택해주세요
  await createEstimateItemDetail(items[1]._id, '네이버 블로그', 'checkbox', 'field2')
  await createEstimateItemDetail(items[1]._id, '유튜브', 'checkbox', 'field2')
  await createEstimateItemDetail(items[1]._id, '인스타그램', 'checkbox', 'field2')
  await createEstimateItemDetail(items[1]._id, '페이스북', 'checkbox', 'field2')

  // SNS 계정관리 -> 월간 몇회 정도의 작업(포스팅)을 생각하고 계신가요?
  await createEstimateItemDetail(items[2]._id, '5회 미만', 'radio', 'field3')
  await createEstimateItemDetail(items[2]._id, '5회 ~ 10회', 'radio', 'field3')
  await createEstimateItemDetail(items[2]._id, '10회 ~ 15회', 'radio', 'field3')
  await createEstimateItemDetail(items[2]._id, '15회 ~ 20회', 'radio', 'field3')
  await createEstimateItemDetail(items[2]._id, '20회 이상', 'radio', 'field3')


  // 공통 디테일
  await createEstimateItemDetail(items[3]._id, '소비재', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '교육', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '식/음료', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '부동산', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '병원', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '쇼핑', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '패션', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '인터넷 서비스', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '엔터테인먼트', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, 'IT솔루션', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '여행/숙박', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '게임', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '공공기관', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '웨딩', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '세무', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '법률', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '전문서비스', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '금융', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '뷰티', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '렌탈', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '제조', 'checkbox', 'field4')
  await createEstimateItemDetail(items[3]._id, '기타', 'checkbox', 'field4')
    
  await createEstimateItemDetail(items[4]._id, '매출향상', 'checkbox', 'field5')
  await createEstimateItemDetail(items[4]._id, '브랜드 인지도', 'checkbox', 'field5')
  await createEstimateItemDetail(items[4]._id, '회원가입', 'checkbox', 'field5')
  await createEstimateItemDetail(items[4]._id, '제품홍보', 'checkbox', 'field5')
  await createEstimateItemDetail(items[4]._id, '기업홍보', 'checkbox', 'field5')
  await createEstimateItemDetail(items[4]._id, '이벤트 참여', 'checkbox', 'field5')
    
  await createEstimateItemDetail(items[5]._id, '협의 가능', 'radio', 'field6')
  await createEstimateItemDetail(items[5]._id, '1주일 이내', 'radio', 'field6')
    
  await createEstimateItemDetail(items[6]._id, '1회성', 'radio', 'field7')
  await createEstimateItemDetail(items[6]._id, '1개월', 'radio', 'field7')
  await createEstimateItemDetail(items[6]._id, '3개월', 'radio', 'field7')
  await createEstimateItemDetail(items[6]._id, '6개월', 'radio', 'field7')
  await createEstimateItemDetail(items[6]._id, '1년', 'radio', 'field7')
  await createEstimateItemDetail(items[6]._id, '1년 이상', 'radio', 'field7')
  await createEstimateItemDetail(items[6]._id, '상담 후 결정', 'radio', 'field7')
    
  await createEstimateItemDetail(items[7]._id, '일시불', 'radio', 'field8')
  await createEstimateItemDetail(items[7]._id, '월', 'radio', 'field8')
  await createEstimateItemDetail(items[7]._id, '상담 후 결정', 'radio', 'field8')
    
  await createEstimateItemDetail(items[8]._id, '서울', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '경기', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '인천', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '충북', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '충남', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '대전', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '세종', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '강원', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '울산', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '대구', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '경남', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '경북', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '부산', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '광주', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '전북', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '전남', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '제주', 'checkbox', 'field9')
  await createEstimateItemDetail(items[8]._id, '기타', 'checkbox', 'field9')
    
  await createEstimateItemDetail(items[9]._id, '전화상담', 'checkbox', 'field10')
  await createEstimateItemDetail(items[9]._id, '채팅상담', 'checkbox', 'field10')
  await createEstimateItemDetail(items[9]._id, '방문상담', 'checkbox', 'field10')
}

// createEstimateForm()
