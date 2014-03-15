define({ api: [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "group": "CatalogModel.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "server\\libs\\db\\CatalogModel.js"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
        }
      ]
    },
    "group": "CatalogModel.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "server\\libs\\db\\CatalogModel.js"
  },
  {
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "group": "CatalogModel.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "server\\libs\\db\\CatalogModel.js"
  },
  {
    "type": "post",
    "url": "/api/catalogs/worktypes/:worktype/tools",
    "title": "Add tool in worktype.",
    "name": "AddToolInWorkType",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "worktype",
            "optional": false,
            "description": "Worktype unique id."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_tool",
            "optional": false,
            "description": "Tool, that will be added."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "patch",
    "url": "/api/catalogs/tools/:tool",
    "title": "Change tool by id.",
    "name": "ChangeToolById",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "tool",
            "optional": false,
            "description": "Tool id."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "Tool name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "description",
            "optional": true,
            "description": "Description."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit",
            "optional": true,
            "description": "Unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate",
            "optional": true,
            "description": "Rate."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit_sec",
            "optional": true,
            "description": "Second unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate_sec",
            "optional": true,
            "description": "Second rate."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_toolgroup",
            "optional": true,
            "description": "Group."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "patch",
    "url": "/api/catalogs/tools/:tool",
    "title": "Change tool by name.",
    "name": "ChangeToolByName",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "tool",
            "optional": false,
            "description": "Tool name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "Tool name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "description",
            "optional": true,
            "description": "Description."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit",
            "optional": true,
            "description": "Unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate",
            "optional": true,
            "description": "Rate."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit_sec",
            "optional": true,
            "description": "Second unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate_sec",
            "optional": true,
            "description": "Second rate."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_toolgroup",
            "optional": true,
            "description": "Group."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "patch",
    "url": "/api/catalogs/units/:unit",
    "title": "Change unit.",
    "name": "ChangeUnit",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit",
            "optional": false,
            "description": "Unit."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "description",
            "optional": true,
            "description": "Description."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "patch",
    "url": "/api/catalogs/worktypes/:worktype",
    "title": "Change worktype.",
    "name": "ChangeWorkTypeById",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "worktype",
            "optional": false,
            "description": "Worktype id."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "Tool name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "short_name",
            "optional": true,
            "description": "Description."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit",
            "optional": true,
            "description": "Unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate",
            "optional": true,
            "description": "Rate."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit_sec",
            "optional": true,
            "description": "Second unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate_sec",
            "optional": true,
            "description": "Second rate."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_worktypegroup",
            "optional": true,
            "description": "Group."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "post",
    "url": "/api/catalogs/tools",
    "title": "Create new tool.",
    "name": "CreateTool",
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
            "description": "Tool name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "description",
            "optional": true,
            "description": "Description."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit",
            "optional": false,
            "description": "Unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate",
            "optional": false,
            "description": "Rate."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit_sec",
            "optional": true,
            "description": "Second unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate_sec",
            "optional": true,
            "description": "Second rate."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_toolgroup",
            "optional": true,
            "description": "Group."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "post",
    "url": "/api/catalogs/tools/groups",
    "title": "Create new tool group.",
    "name": "CreateToolGroup",
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
            "description": "Name."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "post",
    "url": "/api/catalogs/units",
    "title": "Create new unit.",
    "name": "CreateUnit",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit",
            "optional": false,
            "description": "Unit name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "description",
            "optional": true,
            "description": "Description."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "post",
    "url": "/api/catalogs/tools",
    "title": "Create new worktype.",
    "name": "CreateWorkType",
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
            "description": "Tool name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "short_name",
            "optional": false,
            "description": "Short name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit",
            "optional": false,
            "description": "Unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate",
            "optional": false,
            "description": "Rate."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit_sec",
            "optional": true,
            "description": "Second unit."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "rate_sec",
            "optional": true,
            "description": "Second rate."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_worktypegroup",
            "optional": true,
            "description": "Group."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "post",
    "url": "/api/catalogs/worktypes/groups",
    "title": "Create new worktype group.",
    "name": "CreateWorkTypeGroup",
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
            "description": "Name."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "delete",
    "url": "/api/catalogs/tools/groups/:group",
    "title": "Delete tool group by id.",
    "name": "DelToolGroupById",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "group",
            "optional": false,
            "description": "Tool group unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "delete",
    "url": "/api/catalogs/tools/groups/:group",
    "title": "Delete tool group by name.",
    "name": "DelToolGroupByName",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "group",
            "optional": false,
            "description": "Tool group unique name."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "delete",
    "url": "/api/catalogs/worktypes/:worktype/tools",
    "title": "Delete tool in worktype.",
    "name": "DelToolInWorkType",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "worktype",
            "optional": false,
            "description": "Worktype unique id."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_tool",
            "optional": false,
            "description": "Tool, that will be removed."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "delete",
    "url": "/api/catalogs/worktypes/:worktype",
    "title": "Delete worktype by id.",
    "name": "DelWorkType",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "worktype",
            "optional": false,
            "description": "Worktype unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "delete",
    "url": "/api/catalogs/worktypes/groups/:group",
    "title": "Delete worktype group by id.",
    "name": "DelWorkTypeGroupById",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "group",
            "optional": false,
            "description": "Worktype group unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "delete",
    "url": "/api/catalogs/worktypes/groups/:group",
    "title": "Delete worktype group by name.",
    "name": "DelWorkTypeGroupByName",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "group",
            "optional": false,
            "description": "Worktype group unique name."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "delete",
    "url": "/api/streets/:id",
    "title": "Delete street by id.",
    "name": "DeleteStreetById",
    "group": "Catalogs",
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
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\streets.js"
  },
  {
    "type": "delete",
    "url": "/api/streets/:street",
    "title": "Delete street by name.",
    "name": "DeleteStreetByName",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "street",
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
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\streets.js"
  },
  {
    "type": "delete",
    "url": "/api/catalogs/tools/:tool",
    "title": "Delete tool by id.",
    "name": "DeleteToolById",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "tool",
            "optional": false,
            "description": "Tool unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "delete",
    "url": "/api/catalogs/tools/:tool",
    "title": "Delete tool by name.",
    "name": "DeleteToolByName",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "tool",
            "optional": false,
            "description": "Tool unique name."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "delete",
    "url": "/api/catalogs/units/:unit",
    "title": "Delete unit.",
    "name": "DeleteUnit",
    "group": "Catalogs",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "unit",
            "optional": false,
            "description": "Unit."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
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
    "url": "/api/catalogs/tools/groups",
    "title": "Get tools groups.",
    "name": "GetToolsGroups",
    "group": "Catalogs",
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
            "field": "toolGroup",
            "optional": false,
            "description": "List of tool groups."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "toolGroup.id_toolgroup",
            "optional": false,
            "description": "Group."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "toolGroup.name",
            "optional": false,
            "description": "Name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [\n\t\t{\n\t\t\t\"id_toolgroup\": 0,\n\t\t\t\"name\": \"loaders\"\n\t\t}\n   ]\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "get",
    "url": "/api/catalogs/worktypes/:worktype",
    "name": "GetWorkType",
    "group": "Catalogs",
    "permission": "emploee",
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "get",
    "url": "/api/catalogs/worktypes/groups",
    "title": "Get worktype groups.",
    "name": "GetWorkTypeGroups",
    "group": "Catalogs",
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
            "field": "worktypeGroup",
            "optional": false,
            "description": "List of worktype groups."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "worktypeGroup.id_worktypegroup",
            "optional": false,
            "description": "Group."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "worktypeGroup.name",
            "optional": false,
            "description": "Name."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [\n\t\t{\n\t\t\t\"id_worktypegroup\": 0,\n\t\t\t\"name\": \"loaders\"\n\t\t}\n   ]\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "get",
    "url": "/api/catalogs/worktypes/:worktype/tools",
    "title": "Get tools for worktype.",
    "name": "GetWorkTypeTools",
    "group": "Catalogs",
    "permission": "emploee",
    "version": "0.0.0",
    "filename": "server\\api\\catalogs.js"
  },
  {
    "type": "get",
    "url": "/api/catalogs/worktypes",
    "title": "Get worktypes.",
    "name": "GetWorkTypes",
    "group": "Catalogs",
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
            "description": "View number of worktypes."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "group",
            "optional": true,
            "description": "WorkType group."
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
            "field": "worktypes",
            "optional": false,
            "description": "List of worktypes."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "worktypes.name",
            "optional": false,
            "description": "Name."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "worktypes.short_name",
            "optional": false,
            "description": "Short name."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "worktypes.unit",
            "optional": false,
            "description": "Unit."
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "worktypes.rate",
            "optional": false,
            "description": "Rate."
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "worktypes.unit_sec",
            "optional": false,
            "description": "Unit second."
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "worktypes.rate_sec",
            "optional": false,
            "description": "Rate second."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "worktypes.id_worktype",
            "optional": false,
            "description": "Work type."
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "field": "worktypes.id_worktypegroup",
            "optional": false,
            "description": "Group."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [\n\t\t{\n\t\t\t\"name\": \"loader\",\n\t\t\t\"short_name\": \"ld\",\n\t\t\t\"unit\": \"kg\",\n\t\t\t\"rate\": 200.0,\n\t\t\t\"unit_sec\": null,\n\t\t\t\"rate_sec\": 0,\n\t\t\t\"type\": 0,\n\t\t\t\"id_worktype\": 25,\n\t\t\t\"id_worktypegroup\": 0\n\t\t}\n   ]\n"
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
    "type": "get",
    "url": "/api/contractors",
    "title": "Get contractors.",
    "group": "Contractors",
    "name": "GetContractors",
    "permission": "emploee",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [\n     {id_contractor: 1, name: \"Pharma\", ...},\n   ]\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\contractors.js"
  },
  {
    "type": "get",
    "url": "/api/contractors/holdings",
    "title": "Get holdings.",
    "group": "Contractors",
    "name": "GetHoldings",
    "permission": "emploee",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [\n     {\n\t\tid_holding: 1,\n\t\tname: \"Pharma\",\n\t\tshort_name: \"ph\"\n\t }\n   ]\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\contractors.js"
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
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
            "field": "{Integerpa",
            "optional": false,
            "description": "[id_metrobranch] New station branch."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\metro.js"
  },
  {
    "type": "post",
    "url": "/api/metro/branches",
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
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
          "content": "   HTTP/1.1 204 No Content\n"
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
          "content": "   HTTP/1.1 204 No Content\n"
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
          "content": "   HTTP/1.1 204 No Content\n"
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
          "content": "   HTTP/1.1 204 No Content\n"
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
    "type": "patch",
    "url": "/api/naturalpersons/:id",
    "title": "Change natural person by id.",
    "name": "ChangeNaturalPersonById",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Id."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "pass_serial",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "pass_number",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "pass_issued",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "card_number",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "requisites_comment",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_leading_type_of_work",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "address",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_metro",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_brigade",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "field": "DOB",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "field": "date_of_employment",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "status",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "field": "fired",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "firing_comments",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "clothing_size",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "height",
            "optional": true,
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "patch",
    "url": "/api/naturalpersons/:passport",
    "title": "Change natural person passport.",
    "name": "ChangeNaturalPersonByPassport",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "passport",
            "optional": false,
            "description": "Passport serial/number if romat 0000-000000."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "pass_serial",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "pass_number",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "pass_issued",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "card_number",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "requisites_comment",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_leading_type_of_work",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "address",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_metro",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_brigade",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "field": "DOB",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "field": "date_of_employment",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "status",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "field": "fired",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "firing_comments",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "clothing_size",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "height",
            "optional": true,
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "patch",
    "url": "/api/naturalpersons/:id/tools/:tool",
    "title": "Change natural person tool.",
    "name": "ChangeNaturalPersonTool",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "tool",
            "optional": false,
            "description": "Person unique tool id."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "personal_rate",
            "optional": false,
            "description": "Rate."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "patch",
    "url": "/api/naturalpersons/:id/worktypes/:worktype",
    "title": "Change natural person worktype.",
    "name": "ChangeNaturalPersonWorktype",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "worktype",
            "optional": false,
            "description": "Person unique worktype id."
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "personal_rate",
            "optional": false,
            "description": "Rate."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "post",
    "url": "/api/naturalpersons/:id",
    "title": "Create person.",
    "name": "CreateNaturalPerson",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "pass_serial",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "pass_number",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "pass_issued",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "card_number",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "requisites_comment",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_leading_type_of_work",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "address",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_metro",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_brigade",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "field": "DOB",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "field": "date_of_employment",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "status",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "field": "fired",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "firing_comments",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "clothing_size",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "height",
            "optional": true,
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "post",
    "url": "/api/naturalpersons/:id/emails",
    "title": "Create natural person email.",
    "name": "CreateNaturalPersonEmail",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": "Person unique email."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "post",
    "url": "/api/naturalpersons/:id/phones",
    "title": "Create natural person phone.",
    "name": "CreateNaturalPersonPhone",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "phone",
            "optional": false,
            "description": "Person unique phone."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "post",
    "url": "/api/naturalpersons/:id/tools",
    "title": "Create natural person tool.",
    "name": "CreateNaturalPersonTool",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_tool",
            "optional": false,
            "description": "Person tool."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "post",
    "url": "/api/naturalpersons/:id/worktypes",
    "title": "Create natural person worktype.",
    "name": "CreateNaturalPersonWorktype",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id_worktype",
            "optional": false,
            "description": "Person worktype."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "delete",
    "url": "/api/naturalpersons/:id",
    "title": "Delete person by id.",
    "name": "DeleteNaturalPersonById",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "delete",
    "url": "/api/naturalpersons/:passport",
    "title": "Delete person by passport.",
    "name": "DeleteNaturalPersonByPassport",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Passport",
            "field": "passport",
            "optional": false,
            "description": "Person passport in format 0000-000000."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 204 No Content\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "delete",
    "url": "/api/naturalpersons/:id/emails/:email",
    "title": "Delete natural person email.",
    "name": "DeleteNaturalPersonEmail",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": "Person unique email."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "delete",
    "url": "/api/naturalpersons/:id/phones/:phone",
    "title": "Delete natural person phone.",
    "name": "DeleteNaturalPersonPhone",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "phone",
            "optional": false,
            "description": "Person unique phone."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "delete",
    "url": "/api/naturalpersons/:id/tools/:tool",
    "title": "Delete natural person tool.",
    "name": "DeleteNaturalPersonTool",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "tool",
            "optional": false,
            "description": "Person unique tool id."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "delete",
    "url": "/api/naturalpersons/:id/worktypes/:worktype",
    "title": "Delete natural person worktype.",
    "name": "DeleteNaturalPersonWorktype",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "worktype",
            "optional": false,
            "description": "Person unique worktype id."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/brigades",
    "title": "Get brigades list.",
    "name": "GetBrigades",
    "group": "NaturalPersons",
    "permission": "emploee",
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/:id",
    "title": "Get natural person by id.",
    "name": "GetNaturalPersonById",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/:passport",
    "title": "Get natural person by passport.",
    "name": "GetNaturalPersonByPassport",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "passport",
            "optional": false,
            "description": "Passport serial and number in format 0000-000000."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/:id/emails",
    "title": "Get emails.",
    "name": "GetNaturalPersonEmails",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/:id/phones",
    "title": "Get phones.",
    "name": "GetNaturalPersonPhones",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/:id/tools",
    "title": "Get tools.",
    "name": "GetNaturalPersonTools",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/:id/worktypes",
    "title": "Get worktypes.",
    "name": "GetNaturalPersonWorkTypes",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/:id",
    "title": "Get natural person list.",
    "name": "GetNaturalPersons",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "brigade",
            "optional": true,
            "description": "Brigade unique id."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/:id/status",
    "title": "Get personal status.",
    "description": "<span class=\"alert alert-error\">Incomplete / Unstable API</span>\n\nPossible statuses:\n<p style=\"font-family: consolas;\">\n\t\t<b>UNKNOWN = 0x0</b>\n\n\t\tэтот статус можно поставить вручную,\n\t\tесли в самой текущей карточке физическое лицо нажать галочку уволить физ лицо.\n\t\tЕсли снять галочку, сотрудник снова считается работающим.\n\t\t<b>NOT_WORKING = 0x1</b>\n\n\t\tПо списку отказников (см ниже ОТКАЗЫ ГРУЗЧИКОВ) не\n\t\tоткзался ни разу за прошлые 3 месяца.\n\t\tИ нет штрафов за “не выход” за последние 3 месяца.\n\t\t<b>RELIABLE = 0x2</b>\n\n\t\tПо списку отказников (см ниже ОТКАЗЫ ГРУЗЧИКОВ)\n\t\tне откзался ни разу за прошлый месяц, хотя отказывался хотя бы\n\t\tраз за последние 3 месяца.  И нет штрафов за “не выход” за последние 3 месяца.\n\t\t<b>SEMIRELIABLE = 0x4</b>\n\n\t\tВсе остальные, у кого зарегистрированы отказы.\n\t\tНо нет штрафов за “не выход” за последние 3 месяца.\n\t\t<b>REFUSES = 0x8</b>\n\n\t\tЭтот статус ставится только из карточки “физ лиц”,\n\t\tон никак не зависит от кол-ва отказов.\n\t\tВ этом статусе, только если нет штрафов за “не выход” за последние 3 месяца.\n\t\tЕсли есть, то статус прогуливает присваивается\n\t\t<b>TEMP_WORKING = 0x10</b>\n\n\t\tЗарегистрированы штрафы за “не выход” за последние 3 месяца.  см раздел штрафы ниже.\n\t\t<b>TRUANT = 0x20</b>\n</p>",
    "name": "GethNaturalPersonStatus",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Person unique id."
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"status\": 0,\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "get",
    "url": "/api/naturalpersons/search/:query",
    "title": "Search natural persons.",
    "description": "<span class=\"alert alert-error\">Experimental API. Search occurs in the fields: name, pass_serial, pass_number, id_naturalperson</span>",
    "name": "SearchNaturalPersons",
    "group": "NaturalPersons",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "query",
            "optional": false,
            "description": "Query string."
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server\\api\\naturalpersons.js"
  },
  {
    "type": "patch",
    "url": "/api/streets/:id",
    "title": "Change street by id.",
    "name": "ChangeStreetById",
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
            "description": "Street id."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "Street name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "comment",
            "optional": true,
            "description": "Comment."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\streets.js"
  },
  {
    "type": "patch",
    "url": "/api/streets/:street",
    "title": "Change street by name.",
    "name": "ChangeStreetByName",
    "group": "Streets",
    "permission": "emploee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "street",
            "optional": false,
            "description": "Street name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "name",
            "optional": true,
            "description": "Street name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "comment",
            "optional": true,
            "description": "Comment."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "patched",
            "optional": false,
            "description": "Is patched."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\streets.js"
  },
  {
    "type": "post",
    "url": "/api/streets/",
    "title": "Create street.",
    "name": "CreateStreet",
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
            "description": "Street name."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "comment",
            "optional": true,
            "description": "Comment."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "created",
            "optional": false,
            "description": "Is created."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server\\api\\streets.js"
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
    "type": "get",
    "url": "/api/contractors/:contractor/holding",
    "description": "<strong style=\"color: red;\">NOT IMPLEMENTED</strong>\nGet holding information for current contractor.",
    "group": "contractors.js",
    "version": "0.0.0",
    "filename": "server\\api\\contractors.js"
  },
  {
    "type": "get",
    "url": "/api/contractors/types",
    "description": "Get all contractor types.",
    "group": "contractors.js",
    "version": "0.0.0",
    "filename": "server\\api\\contractors.js"
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