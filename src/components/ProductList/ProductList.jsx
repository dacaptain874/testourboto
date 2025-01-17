import React, { useState } from 'react'
import "./ProductList.css"
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'

const products = [
  {id: "1", title: "niso", price: 8400, description: "🧼 Niso Delfin latta – bu super yutuvchi, bardoshli va amaliy tozalash vositasi bo‘lib, har qanday yuzani mukammal toza qiladi! Uyning har bir burchagida tozalik va qulaylik yaratish uchun maxsus ishlab chiqilgan. "},
  {id: "2", title: "niso xxl", price: 13500, description: "🔥 Niso XXL Latta – Katta Hajm, Katta Quvvat!  ### 💡 Asosiy xususiyatlari:  ✅ Katta o‘lcham – Oddiy lattalarga qaraganda 2 baravar kattaroq, keng yuzalarni tezda tozalaydi.  ✅ Super yutuvchi material – Namlik, yog‘ va changni tez shimib oladi va iz qoldirmaydi.  ✅ Ko‘p marta foydalanish – Bardoshli tuzilishi tufayli yuvib, qayta ishlatish mumkin.  ✅ Ideal har qanday sirt uchun – Oshxona, vannaxona, avtomobil va mebellarni tozalash uchun mos.  ✅ Tez quriydi va hid to‘plamaydi – Antibakterial tuzilishga ega, hid yig‘ilishini oldini oladi."},
  {id: "3", title: "niso gigant size", price: 19500, description: "🌟 Niso Gigant Latta – Maksimal Bardoshlilik!  ### 💡 Asosiy xususiyatlari:  ✅ Ultra bardoshli material – Qalin va mustahkam tuzilishi tufayli uzoq yillar xizmat qiladi.  ✅ Qattiq dog‘larni chiqaradi – Kuchli chang va yog‘ni o‘ziga tortish xususiyatiga ega.  ✅ Oson siqiladi – Gigant hajmiga qaramay, suvni tez chiqarib yuboradi va quriydi.  ✅ Ekologik xavfsiz – Kimyoviy qo‘shimchalarsiz, allergiya keltirib chiqarmaydi. "},
  {id: "4", title: "niso gold", price: 10500, description: "🏆 Niso Gold Latta – Premium Tozalash Tajribasi!  ### 💡 Asosiy xususiyatlari:  ✅ Loyihalangan yuqori sifatli material – Extra yumshoqlik va yaltirash effektiga ega.  ✅ Tuk to‘kmaydi va iz qoldirmaydi – Shisha, ekran, mebel va nometall yuzalar uchun ideal.  ✅ O‘ta yengil va qulay – Juda engil bo‘lib, tez quriydi va ko‘p foydalanishga chidamli.  ✅ Professional tozalash uchun mos – Mehmonxonalar, restoranlar va yuqori darajadagi joylar uchun mukammal."},
  {id: "5", title: "niso gold gigant", price: 20500, description: "💡 Niso Gold Gigant latta – bu maxsus premium sifatli tozalash vositasi bo‘lib, gigant hajm va yuqori samaradorlik bilan ajralib turadi. Uyingiz, ofisingiz va avtomobilingiz uchun eng mukammal tanlov!"},
  {id: "6", title: "veral 5W", price: 7177, description: "🔥 5W Vera LED Lampochka – Mini, Lekin Samarali!✅ Juda kam energiya sarfi – Elektrni tejaydi, an'anaviy lampochkalarga nisbatan 80% kamroq sarflaydi.✅ Yumshoq va ko‘zni qamashtirmaydigan yorug‘lik – Uy va ofis uchun ideal.✅ Uzoq muddat ishlash – 25 000 soatgacha xizmat qiladi.💰 Super arzon narx: 7.177 so‘m"},
  {id: "7", title: "veral 7W", price: 8482, description: "🌟 7W Vera LED Lampochka – Kichik Xonalar Uchun Mukammal!✅ Katta maydonlarni yoritish uchun yetarli quvvat✅ Tabiiy yorug‘lik effekti – Ko‘zga yoqimli, qorong‘ida ham yorqinlikni ta’minlaydi.✅ Tashqi ko‘rinishi zamonaviy va ixcham💰 Eng arzon narx: 8.482 so‘m"},
  {id: "8", title: "veral 10W", price: 9135, description: "💡 10W Vera LED Lampochka – Optimal Yorug‘lik!  ✅ Har qanday xona uchun universal yechim – Uy, oshxona, ofis, omborxonalar uchun mos.  ✅ Tez yoniq holatga keladi, qizib ketmaydi  ✅ Yuqori sifatli LED chiplar bilan ishlab chiqarilgan  💰 Juda arzon narx: 9.135 so‘m  "},
  {id: "9", title: "veral 12W", price: 10440, description: "✨ 12W Vera LED Lampochka – Yorqin va Tejamkor!  ✅ O‘rtacha va katta hajmdagi xonalar uchun mos  ✅ An’anaviy 100W lampochkani bemalol almashtiradi  ✅ Ko‘rish qulayligi uchun ko‘zni charchatmaydi  💰 Maxsus chegirma bilan: 10.440 so‘m  "},
  {id: "10", title: "veral 15W", price: 12400, description: "⚡ 15W Vera LED Lampochka – Katta Maydon Uchun Ideal!  ✅ Tejamkor va kuchli yoritish – Garaj, omborxona, do‘konlar uchun ajoyib tanlov.  ✅ Kunduzgi yorug‘lik effektiga ega  ✅ Yorug‘lik taqsimoti bir xil, lo‘killash yo‘q  💰 Bozordagi eng yaxshi narx: 12.400 so‘m"},
  {id: "11", title: "veral 18W", price: 14355, description: "🌞 18W Vera LED Lampochka – Maksimal Yorqinlik!  ✅ Juda keng maydonlarni yoritadi – Savdo markazlari, mehmonxonalar va ofislar uchun mos.  ✅ Eng kuchli yorug‘lik chiqaruvchi variant  ✅ Sifatli LED texnologiyasi tufayli uzoq xizmat muddati  💰 Super arzon narx: 14.355 so‘m  "},
]

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0) 
}

const ProductList = () => {

  const [addedItems, setAddedItems] = useState()
  const {tg} = useTelegram()


  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)

    let newItems = []

    if(alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if(newItems.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Zakaz berish: ${getTotalPrice(newItems)}`
      })
    }

  }

  return (
    <div className='list' >
      {products.map(item => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={"item"}
        />
      ))}
    </div>
  )
}

export default ProductList