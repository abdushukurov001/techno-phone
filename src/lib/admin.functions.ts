import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
export const getAdminProducts=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data:allowed,error:roleError}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});
 if(roleError||!allowed)throw new Error('Admin access required');
 const [{data:products,error},{data:settings}]=await Promise.all([context.supabase.from('products').select('*').order('created_at',{ascending:false}),context.supabase.from('site_settings').select('*').eq('id',1).single()]);
 if(error)throw error;
 return {products:products??[],hideSold:settings?.hide_sold??false};
});
