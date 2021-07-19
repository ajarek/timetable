const container = document.querySelector('.container')
const daysMonth = document.querySelector('.daysMonth')
const NewTime = new Date
let arr = []

function setTime() {
    const clock = document.querySelector('h2');
    const time = new Date()
    clock.innerHTML = `${time.toLocaleDateString()}  ${time.toLocaleTimeString()}`;
}
setInterval(setTime, 1000)

function creatDaysPrevious() {
    const dayWeek = new Date(NewTime.getFullYear(), NewTime.getMonth(), 0).getDay()
    for (j = 1; j <= dayWeek; j++) {
        const div1 = document.createElement('div')
        div1.classList.add('day')
        div1.innerText = ''
        daysMonth.append(div1)
    }
}
creatDaysPrevious()

function create() {
    for (i = 1; i <= 31; i++) {
        const div = document.createElement('div')
        div.classList.add('mark')
        div.classList.add('day')
        div.innerText = i
        daysMonth.append(div)
    }
    currentDay()
    holidays()
    createArea()
}
create()

function currentDay() {
    let zielonyDzien = NewTime.getDate()
    const today = document.querySelectorAll('.day')
    today.forEach(elem => {
        if (elem.textContent == zielonyDzien) {
            elem.classList.add('active')
        }
    })
}

function holidays() {
    const today = document.querySelectorAll('.day')
    today.forEach((elem, index) => {

        if ((index + 1) % 7 == 0) {
            elem.classList.add('holidays')
        }
        if (((index + 1) % 7 == 6)) {
            elem.classList.add('saturday')
        }
    })
}

function createArea() {
    const choose = document.querySelectorAll('.day')
    choose.forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.innerText !== '') {
                const areaContainer = document.createElement('div')
                areaContainer.classList.add('areaContainer')
                const area = document.createElement('textarea')
                area.classList.add('area')
                area.setAttribute('id', e.target.innerText)
                arr.forEach((elm, index) => {
                    if (elm != null && e.target.innerText == index + 1) {
                        area.value = `${elm}`
                    }
                })
                const btn = document.createElement('button')
                btn.classList.add('btn')
                btn.setAttribute('onclick', 'save()')
                btn.innerText = 'zapisz'
                areaContainer.append(area, btn)
                container.append(areaContainer)
            }
        })
    })
}

function save() {
    const mark = [...document.querySelectorAll('.mark')]
    const recordArea = document.querySelector('.area')
    const areaContainer = document.querySelector('.areaContainer')
    arr[recordArea.id - 1] = recordArea.value;
    areaContainer.remove()
    if (recordArea.value.length > 0) {
        mark[recordArea.id - 1].style.backgroundColor = 'orange'
    }
    if (recordArea.value.length < 1) {
        mark[recordArea.id - 1].style.backgroundColor = 'transparent'
    }
}