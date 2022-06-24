const today = new Date().toDateString().split(' ')[0].toLowerCase() // return first three letters from the current day
const chart = document.getElementById('chart')

const data = fetch('./script/data.json')
    .then(async response => {
        const JSONCheck = response.headers.get('content-type')?.includes('application/json')
        const data = JSONCheck ? await response.json() : null

        if (response.ok) {
            return data

        } else if (!response.ok) {
            // receives API error or response status
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
    }
    )
    .catch(error => {
        console.error(error)
    }
    )

data.then(data => {
    data.forEach(element => {
        const barHeight = (element.amount / 7).toFixed(4)
        
        let item = document.createElement('div')
        item.classList.add('item')

        let itemValue = document.createElement('div')
        itemValue.classList.add('item__value')
        itemValue.innerHTML = `$${element.amount}`

        let itemGraph = document.createElement('div')
        itemGraph.classList.add('item__graph')
        itemGraph.style.height = `${barHeight}em`

        let itemParagraph = document.createElement('p')
        itemParagraph.innerHTML = element.day
        
        if (element.day === today) {
            itemGraph.classList.add('active')
        }
        
        item.appendChild(itemValue)
        item.appendChild(itemGraph)
        item.appendChild(itemParagraph)
        chart.appendChild(item)
    }
    )
}
)
