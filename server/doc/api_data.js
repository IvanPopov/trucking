define({ api: [
  {
    "type": "get",
    "url": "/api/catalogs",
    "title": "Get catalogs list.",
    "description": "<strong>Note: Admin view more catalogs, then employeers.</strong>",
    "group": "Catalogs",
    "name": "GetCatalogs",
    "permission": "emploee",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "field": "catalogs",
            "optional": false,
            "description": "List of available catalogs."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [\n     \"streets\",\n     \"metro\",\n     \"holdings\"\n     \"paymentterms\",\n     \"addresstype\"\n   ]\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "get",
    "url": "/api/catalogs/:name",
    "title": "Read catalog.",
    "name": "ReadCatalog",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Catalog name."
          }
        ],
        "Parameters only for admin users:": [
          {
            "group": "Parameters only for admin users:",
            "type": "String",
            "field": "export",
            "optional": true,
            "description": "Export into format. Supported: xlsx."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "patch",
    "url": "/api/metro/branches/:id",
    "title": "Change branch by id.",
    "name": "ChangeBranchById",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "New branch name."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "color",
            "optional": true,
            "description": "New branch color."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"patched\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "patch",
    "url": "/api/metro/branches/:branchName",
    "title": "Change branch by name.",
    "name": "ChangeBranchByName",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "New branch name."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "color",
            "optional": true,
            "description": "New branch color."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"patched\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "patch",
    "url": "/api/metro/stations/:id",
    "title": "Change station by id.",
    "name": "ChangeStationById",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "station",
            "optional": true,
            "description": "New station name."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_metrobranch",
            "optional": true,
            "description": "New station branch."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"patched\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "patch",
    "url": "/api/metro/stations/:name",
    "title": "Change station by name.",
    "name": "ChangeStationByName",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "station",
            "optional": true,
            "description": "New station name."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_metrobranch",
            "optional": true,
            "description": "New station branch."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"patched\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "post",
    "url": "/api/metro/branches/",
    "title": "Create branch.",
    "name": "CreateBranch",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "New branch name."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "color",
            "optional": false,
            "description": "New branch color."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"created\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "post",
    "url": "/api/metro/stations/",
    "title": "Create station.",
    "name": "CreateStation",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "station",
            "optional": false,
            "description": "New station name."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_metrobranch",
            "optional": false,
            "description": "New station branch."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"created\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "delete",
    "url": "/api/metro/branches/:id",
    "title": "Delete branch by id.",
    "name": "DeleteBranchById",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Branch unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "delete",
    "url": "/api/metro/branches/:name",
    "title": "Delete branch by name.",
    "name": "DeleteBranchByName",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Branch unique name."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "delete",
    "url": "/api/metro/stations/:id",
    "title": "Delete station by id.",
    "name": "DeleteStationById",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "Station unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "delete",
    "url": "/api/metro/stations/:name",
    "title": "Delete station by name.",
    "name": "DeleteStationByName",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Station unique name."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "get",
    "url": "/api/metro/branches/:id",
    "title": "Get branch by id.",
    "name": "GetBranchById",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Branch unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"id_metrobranch\": \"1\",\n     \"name\": \"Сокольническая\",\n     \"color\": 0xFF0000\n   }\n"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Branch unique name."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "id_metrobranch",
            "optional": false,
            "description": "Branch unique id."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "color",
            "optional": false,
            "description": "Branch unique color."
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "stations",
            "optional": false,
            "description": "Branch stations."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "stations.station",
            "optional": false,
            "description": "Branch station name."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "get",
    "url": "/api/metro/branches/:branchName",
    "title": "Get branch by Name.",
    "name": "GetBranchByName",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "branchName",
            "optional": false,
            "description": "Branch unique name."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"id_metrobranch\": \"1\",\n     \"name\": \"Сокольническая\",\n     \"color\": 0xFF0000\n   }\n"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Branch unique name."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "id_metrobranch",
            "optional": false,
            "description": "Branch unique id."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "color",
            "optional": false,
            "description": "Branch unique color."
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "stations",
            "optional": false,
            "description": "Branch stations."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "stations.station",
            "optional": false,
            "description": "Branch station name."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "get",
    "url": "/api/metro/branches",
    "title": "Get metro branches list.",
    "name": "GetBranches",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "from",
            "optional": true,
            "description": "View from number."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "count",
            "optional": true,
            "description": "View number of branches."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "branches",
            "optional": false,
            "description": "List of metro branches."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "branches.name",
            "optional": false,
            "description": "Branch name."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "branches.id_metrobranch",
            "optional": false,
            "description": "Branch unique id."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "get",
    "url": "/api/metro/stations/:name",
    "title": "Get station by name.",
    "name": "GetStationByName",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Station unique name."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n\t \"id_metro\": \"1\",\n\t \"id_metrobranch\": 5\n\t \"station\": \"Охотный ряд\",\n   }\n"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "id_metro",
            "optional": false,
            "description": "Station unique id."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "id_metrobranch",
            "optional": false,
            "description": "Branch unique id."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "station",
            "optional": false,
            "description": "Station unique name."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "get",
    "url": "/api/metro/stations/:id",
    "title": "Get station by id.",
    "name": "GetStationhById",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Station unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n\t \"id_metro\": \"1\",\n\t \"id_metrobranch\": 5\n\t \"station\": \"Охотный ряд\",\n   }\n"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "id_metro",
            "optional": false,
            "description": "Station unique id."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "id_metrobranch",
            "optional": false,
            "description": "Branch unique id."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "station",
            "optional": false,
            "description": "Station unique name."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "get",
    "url": "/api/metro/stations",
    "title": "Get stations list.",
    "name": "GetStations",
    "group": "Metro",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "from",
            "optional": true,
            "description": "View from number."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "count",
            "optional": true,
            "description": "View number of branches."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n\t[\n\t\t{\n\t\t\t\"id_metro\": 3,\n\t\t\t\"id_metrobranch\": 1,\n\t\t\t\"station\": \"Охотный ряд\"\n\t\t},\n\t\t{\n\t\t\t\"id_metro\": 7,\n\t\t\t\"id_metrobranch\": 1,\n\t\t\t\"station\": \"Марьина роща\"\n\t\t}\n\t]\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "get",
    "url": "/api/nomenclatures/groups",
    "title": "Get nomenclature groups.",
    "name": "GetNomenclatureGroups",
    "group": "Nomenclatures",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "from",
            "optional": true,
            "description": "View from number."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "count",
            "optional": true,
            "description": "View number of groups."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "nomenclatureGroup",
            "optional": false,
            "description": "List of nomenclature groups."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "nomenclatureGroup.id_nomenclaturegroup",
            "optional": false,
            "description": "Group."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "nomenclatureGroup.name",
            "optional": false,
            "description": "Name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [\n\t\t{\n\t\t\t\"id_nomenclaturegroup\": 0,\n\t\t\t\"name\": \"loaders\"\n\t\t}\n   ]\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\nomenclatures.js"
  },
  {
    "type": "get",
    "url": "/api/nomenclatures",
    "title": "Get nomenclatures.",
    "name": "GetNomenclatures",
    "group": "Nomenclatures",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "from",
            "optional": true,
            "description": "View from number."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "count",
            "optional": true,
            "description": "View number of nomenclatures."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "group",
            "optional": true,
            "description": "Nomenclature group."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "nomenclatures",
            "optional": false,
            "description": "List of nomenclatures."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "nomenclatures.name",
            "optional": false,
            "description": "Name."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "nomenclatures.description",
            "optional": false,
            "description": "Description."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "nomenclatures.unit",
            "optional": false,
            "description": "Unit."
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "nomenclatures.rate",
            "optional": false,
            "description": "Rate."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "nomenclatures.type",
            "optional": false,
            "description": "Can have two values​​: 0 - service, 1 - goods."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "nomenclatures.id_worktype",
            "optional": false,
            "description": "Work type."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "nomenclatures.id_nomenclaturegroup",
            "optional": false,
            "description": "Group."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [\n\t\t{\n\t\t\t\"name\": \"loader\",\n\t\t\t\"description\": \"Loading operations\",\n\t\t\t\"unit\": \"kg\",\n\t\t\t\"rate\": 200.0,\n\t\t\t\"type\": 0,\n\t\t\t\"id_worktype\": 25,\n\t\t\t\"id_nomenclaturegroup\": 0\n\t\t}\n   ]\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\nomenclatures.js"
  },
  {
    "type": "get",
    "url": "/api/streets/:id",
    "title": "Get street by id.",
    "name": "GetStreetById",
    "group": "Streets",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Street unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"id_street\": \"1\",\n     \"name\": \"4-я улица Марьиной рощи\",\n     \"comment\": \"Стратегически важная улица\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\streets.js"
  },
  {
    "type": "get",
    "url": "/api/streets/:name",
    "title": "Get street by name.",
    "name": "GetStreetByName",
    "group": "Streets",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Street unique name."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"id_street\": \"1\",\n     \"name\": \"4-я улица Марьиной рощи\",\n     \"comment\": \"Стратегически важная улица\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\streets.js"
  },
  {
    "type": "get",
    "url": "/api/streets",
    "title": "Get all streets.",
    "name": "GetStreets",
    "group": "Streets",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "sign",
            "optional": true,
            "description": "Only streets assigned with this territorial sign."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "count",
            "optional": true,
            "description": "Number of streets for display."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "from",
            "optional": true,
            "description": "From number of street."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\streets.js"
  },
  {
    "type": "get",
    "url": "/api/userinfo",
    "title": "Get user info.",
    "name": "GetUserinfo",
    "group": "User",
    "permission": "emploee",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"user_id\": \"1\",\n     \"name\": \"admin\",\n     \"permissions\": 1,\n     \"scope\": \"*\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\userinfo.js"
  },
  {
    "type": "get",
    "url": "/api",
    "permission": {
      "name": "employee",
      "title": "Emploee access rights needed.",
      "description": ""
    },
    "group": "app.js",
    "version": "0.0.0",
    "filename": "server\\app.js"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": "Branch unique name."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "id_metrobranch",
            "optional": false,
            "description": "Branch unique id."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "color",
            "optional": false,
            "description": "Branch unique color."
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "stations",
            "optional": false,
            "description": "Branch stations."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "stations.station",
            "optional": false,
            "description": "Branch station name."
          }
        ]
      }
    },
    "group": "metro.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "id_metro",
            "optional": false,
            "description": "Station unique id."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "id_metrobranch",
            "optional": false,
            "description": "Branch unique id."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "station",
            "optional": false,
            "description": "Station unique name."
          }
        ]
      }
    },
    "group": "metro.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  }
] });