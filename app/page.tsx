"use client";

import { FormEvent, useEffect, useState } from "react";

const solutions = [
  ["A", "⚙", "Оборудование и MRO", "Станки, насосы, приводы, пневматика и оригинальные запасные части для производства."],
  ["B", "⌁", "Автоматика и электроника", "ПЛК, датчики, частотные преобразователи и промышленные электронные компоненты."],
  ["C", "◇", "Лаборатории и R&D", "Аналитическое оборудование, реактивы и расходные материалы европейских брендов."],
  ["D", "▣", "Проектные поставки", "Собираем товары от нескольких производителей в одну управляемую поставку."],
];

const steps = [
  ["01", "⌕", "Проверка спецификации", "Уточняем происхождение товара, код ТН ВЭД, ограничения и возможность поставки до оплаты."],
  ["02", "€", "Закупка в Европе", "Выкупаем у производителя или принимаем груз на складах партнёров в Германии, Италии и Польше."],
  ["03", "≡", "Консолидация и ВЭД", "Проверяем комплектность, объединяем позиции и готовим экспортные документы."],
  ["04", "✓", "Доставка на предприятие", "Проходим таможенное оформление и передаём груз на вашем складе с документами."],
];

const faqs = [
  ["Какие товары вы поставляете из Европы?", "Промышленное оборудование, комплектующие, автоматику, инструмент, лабораторные товары и расходные материалы. Возможность поставки подтверждаем после проверки артикула и производителя."],
  ["Из каких стран возможна закупка?", "Работаем с поставщиками в Германии, Италии, Франции, Нидерландах, Польше, Чехии и других странах ЕС. Маршрут выбираем под конкретный товар."],
  ["Какие документы получает заказчик?", "Договор, УПД, счёт-фактуру, упаковочные листы и комплект документов, необходимый для постановки товара на баланс."],
  ["Можно объединить заказы разных брендов?", "Да. Принимаем грузы от разных поставщиков на консолидационном складе, проверяем и отправляем одной партией."],
];

export default function Home() {
  const [weight, setWeight] = useState(250);
  const [route, setRoute] = useState<"standard" | "priority">("standard");
  const [formOpen, setFormOpen] = useState(false);
  const price = Math.round((route === "standard" ? 720 : 1080) + weight * (route === "standard" ? 3.4 : 4.7));

  useEffect(() => {
    if (!formOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setFormOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [formOpen]);

  const openForm = () => setFormOpen(true);

  const sendRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = "Запрос коммерческого предложения — ЕВРОПА ПРОМ";
    const body = [
      `Имя: ${data.get("name")}`,
      `Компания: ${data.get("company") || "—"}`,
      `Телефон: ${data.get("phone")}`,
      `Email: ${data.get("email") || "—"}`,
      "",
      `Вес партии: ${weight} кг`,
      `Маршрут: ${route === "standard" ? "Оптимальный, 20–30 дней" : "Приоритетный, 12–20 дней"}`,
      `Предварительная стоимость логистики: €${price.toLocaleString("en-US")}`,
      "",
      `Комментарий: ${data.get("message") || "—"}`,
    ].join("\n");
    window.location.href = `mailto:euro.prom@bk.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormOpen(false);
  };

  return (
    <main id="top">
      <header className="topbar wrap">
        <a className="brand" href="#top"><b>Е</b><span>ВРОПА</span></a>
        <nav aria-label="Основная навигация">
          <a href="#solutions">Решения</a><a href="#how">Процесс</a><a href="#rates">Расчёт</a><a href="#faq">Контакты</a>
        </nav>
        <button className="darkBtn small" type="button" onClick={openForm}>Запросить КП <span>↗</span></button>
      </header>

      <section className="hero wrap">
        <div className="eyebrow">✦ промышленная логистика Европа → Россия</div>
        <div className="heroGrid">
          <div>
            <h1>Европейская точность.<br/><em>Без границ.</em></h1>
            <p className="lead">Поставляем оборудование, комплектующие и материалы из Европы для производственных предприятий. Закупка, ВЭД и доставка до вашего склада — в одном договоре.</p>
            <div className="actions"><button className="darkBtn" type="button" onClick={openForm}>Получить расчёт <span>→</span></button><a className="textLink" href="#how">Как устроена поставка ↓</a></div>
          </div>
          <div className="routeCard" aria-label="Маршрут поставки">
            <div className="cardTop"><span>партия под контролем</span><b>EU / RU</b></div>
            <div className="routeLine"><i>DE</i><span></span><i className="truck">→</i><span></span><i>RU</i></div>
            <div className="cities"><div><b>Берлин, DE</b><small>Склад консолидации</small></div><mark>12–30 дней</mark><div className="right"><b>Ваш завод</b><small>До склада предприятия</small></div></div>
            <div className="cargo"><b>Е</b><div><small>Партия #EU-2481 · 680 кг</small><strong>Экспортные документы проверены</strong></div><span>ETA 18.09</span></div>
          </div>
        </div>
        <div className="chips"><span>SIEMENS</span><span>FESTO</span><span>SCHNEIDER</span><span>SEW</span><span>BOSCH REXROTH</span><small>50+ брендов</small></div>
      </section>

      <div className="ticker"><div>ОБОРУДОВАНИЕ ✦ КОМПЛЕКТУЮЩИЕ ✦ ВЭД ПОД КЛЮЧ ✦ ДОСТАВКА ДО ПРЕДПРИЯТИЯ ✦</div></div>

      <section className="section wrap" id="solutions">
        <div className="eyebrow">Для промышленности</div>
        <div className="sectionHead"><h2>Снабжение без<br/><em>остановок</em></h2><p>Находим легальный и экономически обоснованный маршрут для каждой номенклатуры — от одного датчика до производственной линии.</p></div>
        <div className="cardGrid">{solutions.map(([n, icon, title, text]) => <article className="solution" key={n}><span>{n}</span><b>{icon}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section navy" id="how"><div className="wrap">
        <div className="eyebrow light">Процесс поставки</div>
        <div className="sectionHead"><h2>От спецификации<br/><em>до вашего склада</em></h2><p>Фиксируем зоны ответственности, контрольные точки и документы до старта работ.</p></div>
        <div className="steps">{steps.map(([n, icon, title, text]) => <article key={n}><div><span>{n}</span><b>{icon}</b></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>

      <section className="section wrap statsSection">
        <div className="eyebrow">Управляемый результат</div>
        <div className="sectionHead"><h2>Цифры, сроки,<br/><em>ответственность.</em></h2><p>Коммерческое предложение содержит структуру затрат, маршрут, сроки и перечень рисков.</p></div>
        <div className="stats"><article><strong>11 лет</strong><b>в промышленной логистике</b><p>Опыт сложных международных поставок</p></article><article><strong>48 ч</strong><b>на расчёт маршрута</b><p>Смета, сроки и комплект документов</p></article><article><strong>100%</strong><b>контроль цепочки</b><p>Один менеджер от запроса до поставки</p></article></div>
      </section>

      <section className="calculator section" id="rates"><div className="wrap calcGrid">
        <div><div className="eyebrow">Предварительная оценка</div><h2>Логистика<br/><em>партии из Европы</em></h2><p>Ориентир без учёта пошлин, страховки и особенностей номенклатуры. Точный расчёт — после спецификации.</p></div>
        <div className="calcBox">
          <label>Вес партии <strong>{weight.toLocaleString("ru-RU")} кг</strong></label>
          <input aria-label="Вес партии" type="range" min="50" max="3000" step="50" value={weight} onChange={e=>setWeight(Number(e.target.value))}/>
          <div className="rangeLabels"><span>50 кг</span><span>3 000 кг</span></div>
          <fieldset><legend>Приоритет маршрута</legend><div className="routeButtons"><button className={route==="standard"?"active":""} onClick={()=>setRoute("standard")}><b>Оптимальный</b><small>20–30 дней</small></button><button className={route==="priority"?"active":""} onClick={()=>setRoute("priority")}><b>Приоритетный</b><small>12–20 дней</small></button></div></fieldset>
          <div className="total"><span>Логистика от</span><strong>€{price.toLocaleString("en-US")}</strong><small>без пошлин и НДС</small></div>
          <button className="accentBtn" type="button" onClick={openForm}>Запросить точное КП <span>→</span></button><em className="reply">Ответим в течение 1 рабочего дня</em>
        </div>
      </div></section>

      <section className="section wrap" id="faq">
        <div className="eyebrow">Контакты</div>
        <div className="faqGrid"><div><h2>До начала<br/><em>поставки</em></h2><p>Пришлите спецификацию — проверим возможность закупки и предложим маршрут.</p><a href="mailto:euro.prom@bk.ru">euro.prom@bk.ru ↗</a><a href="tel:+79162643221">+7 916 264 3221 ↗</a></div><div className="faqList">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary><span>0{i+1}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div></div>
      </section>

      <section className="contact navy" id="contact"><div className="wrap contactInner"><b className="bigE">Е</b><div><div className="eyebrow light">Расчёт поставки</div><h2>Пришлите<br/><em>спецификацию.</em></h2><p>Укажите производителя, артикулы, количество и требуемый срок. Проверим номенклатуру и подготовим предложение.</p></div><button className="accentBtn" type="button" onClick={openForm}>Запросить коммерческое предложение →</button></div></section>

      <footer className="wrap"><a className="brand" href="#top"><b>Е</b><span>ВРОПА</span></a><p>Промышленные поставки<br/>из Европы под ключ.</p><div><a href="#solutions">Решения</a><a href="#how">Процесс</a><a href="#rates">Расчёт</a></div><div><a href="mailto:euro.prom@bk.ru">euro.prom@bk.ru</a><a href="tel:+79162643221">+7 916 264 3221 ↗</a></div><small>© 2026 ЕВРОПА ПРОМ</small></footer>

      {formOpen && <div className="modalBackdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setFormOpen(false)}>
        <section className="requestModal" role="dialog" aria-modal="true" aria-labelledby="request-title">
          <button className="modalClose" type="button" aria-label="Закрыть форму" onClick={() => setFormOpen(false)}>×</button>
          <div className="eyebrow">Коммерческое предложение</div>
          <h2 id="request-title">Обсудим<br/><em>поставку.</em></h2>
          <p>Оставьте контакты и кратко опишите задачу. Мы подготовим ответ в течение одного рабочего дня.</p>
          <form onSubmit={sendRequest}>
            <div className="formRow"><label>Ваше имя<input name="name" autoFocus required autoComplete="name" placeholder="Иван Петров"/></label><label>Компания<input name="company" autoComplete="organization" placeholder="ООО «Пром»"/></label></div>
            <div className="formRow"><label>Телефон<input name="phone" type="tel" required autoComplete="tel" placeholder="+7 900 000 00 00"/></label><label>Email<input name="email" type="email" autoComplete="email" placeholder="name@company.ru"/></label></div>
            <label>Что требуется поставить?<textarea name="message" rows={4} required placeholder="Производитель, артикул, количество и желаемый срок"/></label>
            <button className="accentBtn" type="submit">Отправить запрос <span>→</span></button>
            <small>Нажимая кнопку, вы откроете готовое письмо для отправки на euro.prom@bk.ru.</small>
          </form>
        </section>
      </div>}
    </main>
  );
}
