<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Priority
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int $users_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property User $user
 * @property Collection|Repair[] $repairs
 * @property Collection|RepairsItem[] $repairs_items
 * @property Collection|RepairsTool[] $repairs_tools
 *
 * @package App\Models
 */
class Priority extends Model
{
	use SoftDeletes;
	protected $table = 'priorities';

	protected $casts = [
		'users_id' => 'int'
	];

	protected $fillable = [
		'name',
		'description',
		'users_id'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'users_id');
	}

	public function repairs()
	{
		return $this->hasMany(Repair::class, 'priorities_id');
	}

	public function repairs_items()
	{
		return $this->hasMany(RepairsItem::class, 'priorities_id');
	}

	public function repairs_tools()
	{
		return $this->hasMany(RepairsTool::class, 'priorities_id');
	}
}
