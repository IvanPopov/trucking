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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"patched\": true\n   }\n"
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
            "field": "deleted",
            "optional": false,
            "description": "Is deleted."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"created\": true\n   }\n"
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
    "type": "delete",
    "url": "/api/catalogs/tools/:tool",
    "title": "Delete tool by id.",
    "name": "Catalogs",
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "deleted",
            "optional": false,
            "description": "Is deleted."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
        }
      ]
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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"patched\": true\n   }\n"
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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"patched\": true\n   }\n"
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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"patched\": true\n   }\n"
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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"patched\": true\n   }\n"
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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"created\": true\n   }\n"
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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"created\": true\n   }\n"
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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"created\": true\n   }\n"
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
          "content": "   HTTP/1.1 200 OK\n   {\n     \"created\": true\n   }\n"
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "deleted",
            "optional": false,
            "description": "Is deleted."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
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
    "name": "DelWorkTypeGroup",
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "deleted",
            "optional": false,
            "description": "Is deleted."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "deleted",
            "optional": false,
            "description": "Is deleted."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "deleted",
            "optional": false,
            "description": "Is deleted."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"deleted\": true\n   }\n"
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
            "type": "Integer",
            "field": "id",
            "optional": false,
            "description": "Branch unique id."
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
            "field": "deleted",
            "optional": false,
            "description": "Is deleted."
          }
        ]
      },
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "deleted",
            "optional": false,
            "description": "Is deleted."
          }
        ]
      },
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
    "url": "/api/contractors/types",
    "description": "Get all contractor types.",
    "group": "contractors.js",
    "version": "0.0.0",
    "filename": "server\\api\\contractors.js"
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
  }
] });