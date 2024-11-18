import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import jobList from './constants/jobList'
import educationList from './constants/educationList'
import salaryList from './constants/salaryList'
import { Factory, Model, Server } from 'miragejs'

const filterFormat = (data, companyName, educationLevel, salaryLevel) => {
  let result = data

  if (companyName) {
    result = result.filter(item => item.companyName.includes(companyName))
  }
  if (educationLevel) {
    result = result.filter(item => item.educationId === educationLevel)
  }
  if (salaryLevel) {
    result = result.filter(item => item.salaryId === salaryLevel)
  }

  return result
}

new Server({
  models: {
    jobList: Model,
    educationList: Model,
    salaryList: Model,
  },
  factories: {
    jobList: Factory.extend({
      companyName(i) {
        return jobList[i].companyName
      },
      jobTitle(i){
        return jobList[i].jobTitle
      },
      educationId(i){
        return jobList[i].educationId
      },
      salaryId(i){
        return jobList[i].salaryId
      },
      preview(i){
        return jobList[i].preview
      },
      companyPhoto(i){
        return jobList[i].companyPhoto
      },
      description(i){
        return jobList[i].description
      },
    }),
    educationList: Factory.extend({
      id(i) {
        return educationList[i].id
      },
      label(i) {
        return educationList[i].label
      }
    }),
    salaryList: Factory.extend({
      id(i) {
        return salaryList[i].id
      },
      label(i) {
        return salaryList[i].label
      }
    }),
  },
  seeds(server) {
    server.createList("jobList", jobList.length)
    server.createList('educationList', educationList.length)
    server.createList('salaryList', salaryList.length)
  },
  routes() {
    this.namespace = 'api/v1'

    this.get('/jobs', (schema, request) => {
      // * filter
      const companyName = request.queryParams.company_name
      const educationLevel = Number(request.queryParams.education_level)
      const salaryLevel = Number(request.queryParams.salary_level)

      // * pagination
      const prePage = Number(request.queryParams.pre_page)
      const page = Number(request.queryParams.page)

      let data = schema.jobLists.all().models
        .map(({ attrs: { companyPhoto, description, ...rest}}) => rest)

      if(!isNaN(prePage) && !isNaN(page)) {
        const startIndex = (page - 1) * prePage
        const endIndex = startIndex + prePage
        const filterData = filterFormat(data, companyName, educationLevel, salaryLevel)
        const resultData = filterData.slice(startIndex, endIndex) 
        return {
          data: resultData,
          total: filterData.length
        }
      } else {
        const result = filterFormat(data, companyName, educationLevel, salaryLevel)
        return {
          data: result,
          total: result.length
        }
      }
    })

    this.get('/educationLevelList', (schema) => {
      return schema.educationLists.all().models
        .map(item => item.attrs)
    })

    this.get('/salaryLevelList', (schema) => {
      return schema.salaryLists.all().models
        .map(item => item.attrs)
    })

    this.get('/jobs/:id', (schema, request) => {
      const id = request.params.id
      const data = schema.jobLists.all().models
        .find(item => item.id === id)

      if(data) {
        const { preview, educationId, salaryId, ...rest } = data.attrs
        return rest
      } else {
        return []
      }
    })
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);