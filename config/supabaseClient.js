
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nubtkumtcbqubykisunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51YnRrdW10Y2JxdWJ5a2lzdW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NTI5OTIsImV4cCI6MjA0ODAyODk5Mn0.YXt4qubyoHFWF7yL2dBJBkFYIjyEYNXPpHWK7UlQLJU'
const supabase = createClient(supabaseUrl, supabaseKey)
console.log('Supabase client initialized:', supabase);
console.log('Supabase storage:', supabase.storage);

export default supabase;
export { supabaseKey , supabaseUrl}