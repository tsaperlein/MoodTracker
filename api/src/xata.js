// Generated by Xata Codegen 0.29.5. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "Assigns",
    columns: [
      {
        name: "quote_id",
        type: "link",
        link: { table: "Quote" },
        notNull: true,
        unique: true,
        defaultValue: null,
      },
      {
        name: "user_id",
        type: "link",
        link: { table: "User" },
        notNull: true,
        unique: true,
        defaultValue: null,
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
      },
    ],
  },
  {
    name: "DailyMood",
    columns: [
      {
        name: "emoji_id",
        type: "link",
        link: { table: "Emoji" },
        notNull: false,
        unique: false,
        defaultValue: null,
      },
      {
        name: "user_id",
        type: "link",
        link: { table: "User" },
        notNull: true,
        unique: true,
        defaultValue: null,
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
      },
    ],
  },
  {
    name: "DiaryPage",
    columns: [
      {
        name: "image",
        type: "file",
        file: { defaultPublicAccess: false },
        notNull: false,
        unique: false,
        defaultValue: null,
      },
      {
        name: "text",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
      },
      {
        name: "user_id",
        type: "link",
        link: { table: "User" },
        notNull: true,
        unique: true,
        defaultValue: null,
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
      },
    ],
  },
  {
    name: "Emoji",
    columns: [
      {
        name: "type",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: "'nothing'::text",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
      },
    ],
  },
  {
    name: "Quote",
    columns: [
      {
        name: "author",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
      },
      {
        name: "text",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
      },
    ],
  },
  {
    name: "Survey",
    columns: [
      {
        name: "comment",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: "'null'::text",
      },
      {
        name: "emoji_id",
        type: "link",
        link: { table: "Emoji" },
        notNull: true,
        unique: false,
        defaultValue: null,
      },
      {
        name: "keywords",
        type: "multiple",
        notNull: false,
        unique: false,
        defaultValue: null,
      },
      {
        name: "question",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
      },
      {
        name: "user_id",
        type: "link",
        link: { table: "User" },
        notNull: true,
        unique: true,
        defaultValue: null,
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
      },
    ],
  },
  {
    name: "User",
    columns: [
      {
        name: "email",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
      },
      {
        name: "first_name",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
      },
      {
        name: "last_name",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
      },
      {
        name: "password",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
      },
      {
        name: "streak_count",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "'0'::bigint",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
      },
    ],
  },
];
/** @type { import('@xata.io/client').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:
    "https://Alexandros-Tsaparas-s-workspace-k2n6ga.eu-central-1.xata.sh/db/Mood_Tracker",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};
