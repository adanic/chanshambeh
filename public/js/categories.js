categories =
      { 'food': 'خوراک و روزمره'
      , 'household': 'ساختمان و لوازم خانه'
      , 'transportation': 'رفت و آمد'
      , 'healthcare': 'دارو و درمان'
      , 'bill': 'قبض'
      , 'education': 'آموزش'
      , 'hobby': 'ورزش و سرگرمی'
      , 'personal': 'شخصی'
      , 'commitment': 'اقساط و تعهدات'
      , 'present': 'هدیه و خیریه'
      , 'hygiene': 'آرایش و بهداشت'
      , 'clothing': 'پوشاک'
      , 'lend': 'قرض دادن'
      , 'investment': 'سرمایه گذاری'
      , 'expense': 'دسته بندی نشده'
      }

function getCategoryLabel (category) {
  var cat = categories[category]
  return cat
}

function getCategories () {
      return [
      {'category' : '', 'unicode' : '', 'radius' : 30}
      , {'category' : 'food', 'unicode' : '\ue601', 'radius' : 30}
      , {'category' : 'household', 'unicode' : '\ue600', 'radius' : 30}
      , {'category' : 'transportation', 'unicode' : '\ue602', 'radius' : 30}
      , {'category' : 'healthcare', 'unicode' : '\ue606', 'radius' : 30}
      , {'category' : 'bill', 'unicode' : '\ue604', 'radius' : 30}
      , {'category' : 'education', 'unicode' : '\ue603', 'radius' : 30}
      , {'category' : 'hobby', 'unicode' : '\ue605', 'radius' : 30}
      , {'category' : 'personal', 'unicode' : '\ue609', 'radius' : 30}
      , {'category' : 'commitment', 'unicode' : '\ue60c', 'radius' : 30}
      , {'category' : 'present', 'unicode' : '\ue60a', 'radius' : 30}
      , {'category' : 'hygiene', 'unicode' : '\ue607', 'radius' : 30}
      , {'category' : 'clothing', 'unicode' : '\ue608', 'radius' : 30}
      , {'category' : 'investment', 'unicode' : '\ue60d', 'radius' : 30}
      , {'category' : 'expense', 'unicode' : '\ue60e', 'radius' : 30}
      ]
}
