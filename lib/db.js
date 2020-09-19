import mysql from 'serverless-mysql'

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
})

export async function query(statement){
  try {
    let results = await db.query(statement)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}