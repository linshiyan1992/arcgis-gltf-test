import SceneLayer from '@arcgis/core/layers/SceneLayer'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'
import Map from '@arcgis/core/Map'

const sceneLayer = new SceneLayer({
  portalItem: {
    id: 'b28a548fe74149e08d5177ccb889dbd3',
    portal: {
      url: 'https://geosceneonline.cn/geoscene'
    }
  }
})

export const featureLayer = new FeatureLayer({
  portalItem: {
    id: '07c2199537f644d2a103625945f7fa54',
    portal: {
      url: 'https://geosceneonline.cn/geoscene'
    }
  }
})

const map = new Map({
  layers: [sceneLayer, featureLayer]
})

/**
 * X,59.2180
 * Y,-12.7374
 * Z,17.9757
 * 倾斜,-11.8000
 * 滚动,0.0000
 * 标头,316.2000
 * 视域,55.0000
 */

export const view = new SceneView({
  map,
  environment: {
    lighting: {
      type: 'sun',
      directShadowsEnabled: true,
      date: new Date('March 8, 2022 12:00:00 UTC')
    }
  }
})

export function initScene(container) {
  view.container = container
}
