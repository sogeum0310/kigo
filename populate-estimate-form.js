var Model = require('./models/model')


var estimate_items = []

function createEstimateItem(name) {
  var estimate_item = new Model.EstimateItem({
    name: name
  })
  estimate_item.save()
  estimate_items.push(estimate_item)
}


function createEstimateItemDetail(estimate_item, name, ) {
  var estimate_item_detail = new Model.EstimateItemDetail({
    estimate_item: estimate_item,
    name: name,
  })
  estimate_item_detail.save()
}

createEstimateItem('원하시는 광고 방법을 선택해주세요.')
createEstimateItem('월간 몇회 정도의 작업(포스팅)을 생각하고 계신가요?')
createEstimateItem('광고 하실 업종 또는 상품을 선택해주세요. (중복선택 가능)')
createEstimateItem('광고 목적을 선택해주세요. (중복선택 가능)')
createEstimateItem('원하시는 광고 시작 날짜를 선택해주세요.')

createEstimateItem('원하시는 광고 집행 기간을 선택해주세요.')
createEstimateItem('원하시는 대략적인 예상 금액을 입력해주세요.')
createEstimateItem('고객님이 계신 지역을 선택해주세요. (중복선택 가능)')
createEstimateItem('원하시는 피드백 서비스를 선택해주세요. (중복선택 가능)')

createEstimateItemDetail(estimate_items[0]._id, '온라인 광고')
createEstimateItemDetail(estimate_items[0]._id, '오프라인 광고')
createEstimateItemDetail(estimate_items[0]._id, '판촉물 제작/배포')

createEstimateItemDetail(estimate_items[1]._id, '5회 미만')
createEstimateItemDetail(estimate_items[1]._id, '5-10회')
createEstimateItemDetail(estimate_items[1]._id, '10-15회')
createEstimateItemDetail(estimate_items[1]._id, '20회 이상')

createEstimateItemDetail(estimate_items[2]._id, '소비재')
createEstimateItemDetail(estimate_items[2]._id, '교육')
createEstimateItemDetail(estimate_items[2]._id, '식/음료')
createEstimateItemDetail(estimate_items[2]._id, '부동산')
createEstimateItemDetail(estimate_items[2]._id, '병원')
createEstimateItemDetail(estimate_items[2]._id, '쇼핑')
createEstimateItemDetail(estimate_items[2]._id, '패션')
createEstimateItemDetail(estimate_items[2]._id, '인터넷 서비스')
createEstimateItemDetail(estimate_items[2]._id, '엔터테인먼트')
createEstimateItemDetail(estimate_items[2]._id, 'IT솔루션')
createEstimateItemDetail(estimate_items[2]._id, '여행/숙박')
createEstimateItemDetail(estimate_items[2]._id, '게임')
createEstimateItemDetail(estimate_items[2]._id, '공공기관')
createEstimateItemDetail(estimate_items[2]._id, '웨딩')
createEstimateItemDetail(estimate_items[2]._id, '세무')
createEstimateItemDetail(estimate_items[2]._id, '법률')
createEstimateItemDetail(estimate_items[2]._id, '전문서비스')
createEstimateItemDetail(estimate_items[2]._id, '금융')
createEstimateItemDetail(estimate_items[2]._id, '뷰티')
createEstimateItemDetail(estimate_items[2]._id, '렌탈')
createEstimateItemDetail(estimate_items[2]._id, '제조')
createEstimateItemDetail(estimate_items[2]._id, '기타')

createEstimateItemDetail(estimate_items[3]._id, '매출향상')
createEstimateItemDetail(estimate_items[3]._id, '브랜드 인지도')
createEstimateItemDetail(estimate_items[3]._id, '회원가입')
createEstimateItemDetail(estimate_items[3]._id, '제품홍보')
createEstimateItemDetail(estimate_items[3]._id, '기업홍보')
createEstimateItemDetail(estimate_items[3]._id, '이벤트 참여')
createEstimateItemDetail(estimate_items[3]._id, '기타')

createEstimateItemDetail(estimate_items[4]._id, '협의 가능')
createEstimateItemDetail(estimate_items[4]._id, '1주일 이내')

createEstimateItemDetail(estimate_items[5]._id, '1회성')
createEstimateItemDetail(estimate_items[5]._id, '1개월')
createEstimateItemDetail(estimate_items[5]._id, '3개월')
createEstimateItemDetail(estimate_items[5]._id, '6개월')
createEstimateItemDetail(estimate_items[5]._id, '1년')
createEstimateItemDetail(estimate_items[5]._id, '1년 이상')
createEstimateItemDetail(estimate_items[5]._id, '상담 후 결정')

createEstimateItemDetail(estimate_items[6]._id, '일시불')
createEstimateItemDetail(estimate_items[6]._id, '월 10만원 미만')
createEstimateItemDetail(estimate_items[6]._id, '월 10-30만원')
createEstimateItemDetail(estimate_items[6]._id, '월 30만원 이상')
createEstimateItemDetail(estimate_items[6]._id, '상담 후 결정')

createEstimateItemDetail(estimate_items[7]._id, '서울')
createEstimateItemDetail(estimate_items[7]._id, '경기')
createEstimateItemDetail(estimate_items[7]._id, '인천')
createEstimateItemDetail(estimate_items[7]._id, '충북')
createEstimateItemDetail(estimate_items[7]._id, '대전')
createEstimateItemDetail(estimate_items[7]._id, '강원')
createEstimateItemDetail(estimate_items[7]._id, '울산')
createEstimateItemDetail(estimate_items[7]._id, '대구')
createEstimateItemDetail(estimate_items[7]._id, '경남')
createEstimateItemDetail(estimate_items[7]._id, '경북')
createEstimateItemDetail(estimate_items[7]._id, '부산')
createEstimateItemDetail(estimate_items[7]._id, '광주')
createEstimateItemDetail(estimate_items[7]._id, '전북')
createEstimateItemDetail(estimate_items[7]._id, '전남')
createEstimateItemDetail(estimate_items[7]._id, '제주')
createEstimateItemDetail(estimate_items[7]._id, '기타')

createEstimateItemDetail(estimate_items[8]._id, '전화상담')
createEstimateItemDetail(estimate_items[8]._id, '채팅상담')
createEstimateItemDetail(estimate_items[8]._id, '방문상담')