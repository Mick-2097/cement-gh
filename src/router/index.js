import { createRouter, createWebHistory } from 'vue-router'

import Projects from '../views/Projects.vue'
import Create from '../views/CreateProject.vue'
import ProjectData from '../views/ProjectData.vue'
import BuildingObjectData from '../views/BuildingObjectData.vue'
import BuildingData from '../views/BuildingData.vue'
import AreaData from '../views/AreaData.vue'
import Reports from '../views/Reports.vue'
import Compositions from '../views/ConcreteCompositions.vue'
import SpotData from '../views/SpotData.vue'
import TestLogin from '../views/Login.vue'
import Register from '../views/Register.vue'
import Test from '../views/Test.vue'
import Sensors from '../views/Sensors.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'none',
      redirect: '/projects',
      component: Projects
    },
    {
      path: '/test',
      name: 'test',
      component: TestLogin,
      meta: {
        title: 'test page'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: {
        title: 'Projects'
      }
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: {
        title: 'Create project'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id',
      name: 'projectdata',
      component: ProjectData,
      meta: {
        title: 'Project data'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/building_objects/:building_object_id',
      name: 'buildingobjectdata',
      component: BuildingObjectData,
      meta: {
        title: 'Building Object data'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/building_objects/:building_object_id/buildings/:building_id',
      name: 'buildingdata',
      component: BuildingData,
      meta: {
        title: 'Building data'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/building_objects/:building_object_id/areas/:area_id',
      name: 'areadata',
      component: AreaData,
      meta: {
        title: 'Area Data'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/building_objects/:building_object_id/buildings/:building_id/spots/:spot_id',
      name: 'spotdata',
      component: SpotData,
      meta: {
        title: 'Monitoring spot data'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/reports',
      name: 'reports',
      component: Reports,
      meta: {
        title: 'Reports'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/reports/object/:building_object_id',
      name: 'reportsobject',
      component: Reports,
      meta: {
        title: 'Reports'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/reports/object/:building_object_id/area/:area_id',
      name: 'reportsarea',
      component: Reports,
      meta: {
        title: 'Reports'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/sensors',
      name: 'sensors',
      component: Sensors,
      meta: {
        title: 'Sensors'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/sensors/building_object_id/:building_object_id',
      name: 'sensorsbuildingobject',
      component: Sensors,
      meta: {
        title: 'Sensors'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/sensors/building_object_id/:building_object_id/sensor_id/:sensor_id',
      name: 'sensorssensorid',
      component: Sensors,
      meta: {
        title: 'Sensors'
      }
    },
    {
      path: '/companies/:company_id/projects/:project_id/compositions',
      name: 'compositions',
      component: Compositions,
      meta: {
        title: 'Concrete compositions'
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})

export default router
