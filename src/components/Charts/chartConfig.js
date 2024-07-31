import { ru } from 'date-fns/locale'
import { getRgbColorFromTheList } from '@/utilities/colors'
import { useI18n } from 'vue-i18n'

export function getLineFormattedData(items) {
  const datasets = items.datasets.map((item, index) => {
    const color = getRgbColorFromTheList(index)
    return {
      ...item,
      backgroundColor: `rgba(${color.r},${color.g},${color.b}, 0.1)`,
      borderColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
      pointBackgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
      fill: true,
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      pointRadius: 1,
      pointHoverRadius: 3,
      parsing: {
        xAxisKey: 'x',
        yAxisKey: 'y'
      }
    }
  })

  return {
    ...items,
    datasets
  }
}

function getChartConfig(dataset, yText) {
  const i18n = useI18n()
  const timeMin = new Date(dataset.minX)
  const timeMax = new Date(dataset.maxX)
  timeMin.setHours(timeMin.getHours() - 1)
  timeMax.setHours(timeMax.getHours() + 1)

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false
    },
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: i18n.t('Charts.Date&Time'),
          align: 'start'
        },
        adapters: {
          date: {
            locale: ru
          }
        },
        time: {
          tooltipFormat: 'dd MMMM H:mm',
          displayFormats: {
            second: 'mm:ss',
            minute: 'H:mm:ss',
            hour: 'dd MMMM H:mm'
          }
        }
      },
      y: {
        title: {
          display: true,
          text: yText
        }
      }
    },
    plugins: {
      zoom: {
        limits: {
          y: {
            min: dataset.minY || -100,
            max: dataset.maxY || 100
          },
          x: {
            min: timeMin,
            max: timeMax
          }
        },
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
          speed: 0.1,
          threshold: 2,
          sensitivity: 3
        }
      }
    }
  }
}

export function getChartOptions(key, dataset) {
  const i18n = useI18n()
  const yAxisTexts = {
    temperature: i18n.t('Charts.Deg-C'),
    strength: i18n.t('Charts.MPa'),
    maturity: i18n.t('Charts.°C*h')
  }

  return getChartConfig(dataset, yAxisTexts[key])
}
