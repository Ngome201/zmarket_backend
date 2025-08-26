
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'sqlite',
//         database: 'database.sqlite',
//         extra: {
//             busyTimeout: 3000, // Wait up to 3000 milliseconds (3 seconds)
//         },
//         entities: [
//             __dirname + '/../**/*.entity{.ts,.js}',
//         ],
//         synchronize: true,
//         // logging:true
//       });

//       return dataSource.initialize();
//     },
//   },
// ];
const config = {
  type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'aws',
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: ["dist/migrations/*{.ts,.js}"],
        synchronize: true,
        logging:true
}
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(config as DataSourceOptions);

      return dataSource.initialize();
    },
  },
];

export default registerAs('typeorm', () => config)

export const connectionSource = new DataSource(config as DataSourceOptions);




// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         url:"https://dpg-d1q4vivfte5s73cvcon0-a.oregon-postgres.render.com/labdb_titv",
//         // url:"postgresql://root:26nMI8HhOHTCFFmHuLSIg772zNVjwDCo@dpg-d1q4vivfte5s73cvcon0-a/labdb_titv",
//         host: 'dpg-d1q4vivfte5s73cvcon0-a',
//         port: 5432,
//         username: 'root',
//         password: '26nMI8HhOHTCFFmHuLSIg772zNVjwDCo',
//         database: 'database.sqlite',
//         entities: [
//             __dirname + '/../**/*.entity{.ts,.js}',
//         ],
//         synchronize: true,
//         logging:true
//       });

//       return dataSource.initialize();
//     },
//   },
// ];
